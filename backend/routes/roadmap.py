from flask import Blueprint, request

from services.gemini_service import generate_roadmap
from config.db import get_connection

roadmap = Blueprint("roadmap", __name__)


@roadmap.route("/generate-roadmap", methods=["POST"])
def create_roadmap():

    data = request.json

    title = data["title"]
    description = data["description"]
    deadline = data["deadline"]
    priority = data["priority"]
    goal_id = data["goal_id"]

    roadmap_text = generate_roadmap(
        title,
        description,
        deadline,
        priority
    )

    if roadmap_text is None:

        return {
            "message": "AI roadmap service is temporarily unavailable. Please try again."
        }, 503

    tasks = [
        task.strip()
        for task in roadmap_text.split("\n")
        if task.strip()
    ]
    conn = get_connection()
    cur = conn.cursor()

    # Save roadmap

    cur.execute(
        """
        INSERT INTO roadmaps
        (
            goal_id,
            roadmap
        )
        VALUES (%s,%s)
        RETURNING id
        """,
        (
            goal_id,
            roadmap_text
        )
    )

    roadmap_id = cur.fetchone()[0]

    cur.execute(
        """
        SELECT user_id
        FROM goals
        WHERE id = %s
        """,
        (goal_id,)
    )

    user_id = cur.fetchone()[0]

    cur.execute(
        """
        INSERT INTO notifications
        (
            user_id,
            message
        )
        VALUES (%s,%s)
        """,
        (
            user_id,
            "🧠 AI roadmap generated successfully."
        )
    )

    # Save generated tasks

    for task in tasks:

        cur.execute(
            """
            INSERT INTO tasks
            (
                goal_id,
                title
            )
            VALUES (%s,%s)
            """,
            (
                goal_id,
                task
            )
        )

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Roadmap generated",
        "roadmap_id": roadmap_id,
        "roadmap": roadmap_text
    }


@roadmap.route("/roadmap/<int:goal_id>", methods=["GET"])
def get_roadmap(goal_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT roadmap
        FROM roadmaps
        WHERE goal_id = %s
        ORDER BY id DESC
        LIMIT 1
        """,
        (goal_id,)
    )

    row = cur.fetchone()

    cur.close()
    conn.close()

    if not row:
        return {
            "message": "Roadmap not found"
        }, 404

    return {
        "roadmap": row[0]
    }