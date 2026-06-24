from flask import Blueprint
from config.db import get_connection

planner = Blueprint("planner", __name__)

@planner.route("/planner/<int:goal_id>", methods=["GET"])
def get_planner(goal_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT
            id,
            title,
            completed
        FROM tasks
        WHERE goal_id = %s
        ORDER BY id
        """,
        (goal_id,)
    )

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return [
        {
            "id": row[0],
            "title": row[1],
            "completed": row[2]
        }
        for row in rows
    ]

@planner.route("/planner/user/<user_id>", methods=["GET"])
def get_user_planner(user_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT id
        FROM goals
        WHERE user_id = %s
        ORDER BY id DESC
        LIMIT 1
        """,
        (user_id,)
    )

    goal = cur.fetchone()

    if not goal:

        cur.close()
        conn.close()

        return {
            "message": "No goals found"
        }, 404

    goal_id = goal[0]

    cur.execute(
        """
        SELECT
            id,
            title,
            completed
        FROM tasks
        WHERE goal_id = %s
        ORDER BY id
        """,
        (goal_id,)
    )

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return {
        "goal_id": goal_id,
        "tasks": [
            {
                "id": row[0],
                "title": row[1],
                "completed": row[2]
            }
            for row in rows
        ]
    }