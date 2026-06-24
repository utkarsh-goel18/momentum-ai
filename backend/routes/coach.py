from flask import Blueprint
from config.db import get_connection

from services.gemini_service import generate_coach_advice

coach = Blueprint("coach", __name__)

@coach.route("/coach/<int:goal_id>")
def get_coach(goal_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT
            title,
            deadline,
            priority
        FROM goals
        WHERE id = %s
        """,
        (goal_id,)
    )

    goal = cur.fetchone()

    cur.execute(
        """
        SELECT
            title,
            completed
        FROM tasks
        WHERE goal_id = %s
        ORDER BY id
        """,
        (goal_id,)
    )

    tasks = cur.fetchall()

    cur.close()
    conn.close()

    total_tasks = len(tasks)

    completed_tasks = len(
        [t for t in tasks if t[1]]
    )

    pending_tasks = [
        t[0]
        for t in tasks
        if not t[1]
    ]

    advice = generate_coach_advice(
        goal_title=goal[0],
        deadline=str(goal[1]),
        priority=goal[2],
        total_tasks=total_tasks,
        completed_tasks=completed_tasks,
        pending_tasks=pending_tasks
    )

    return {
        "advice": advice
    }