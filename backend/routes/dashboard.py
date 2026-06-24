from flask import Blueprint
from config.db import get_connection

dashboard = Blueprint("dashboard", __name__)

@dashboard.route("/dashboard/<string:user_id>", methods=["GET"])
def get_dashboard(user_id):

    conn = get_connection()
    cur = conn.cursor()

    # ==================================
    # ACTIVE GOAL
    # ==================================

    cur.execute(
        """
        SELECT
            id,
            title,
            deadline,
            priority
        FROM goals
        WHERE user_id = %s
        AND status = 'active'
        ORDER BY id DESC
        LIMIT 1
        """,
        (user_id,)
    )

    goal = cur.fetchone()

    # ==================================
    # STREAK DATA
    # ==================================

    cur.execute(
        """
        SELECT
            current_streak,
            longest_streak
        FROM streaks
        WHERE user_id = %s
        """,
        (user_id,)
    )

    streak = cur.fetchone()

    current_streak = 0
    longest_streak = 0

    if streak:
        current_streak = streak[0]
        longest_streak = streak[1]

    # ==================================
    # NO ACTIVE GOAL
    # ==================================

    if not goal:

        cur.close()
        conn.close()

        return {
            "goal": None,
            "tasks": [],
            "progress": 0,
            "completed_tasks": 0,
            "total_tasks": 0,
            "current_streak": current_streak,
            "longest_streak": longest_streak
        }

    goal_id = goal[0]

    # ==================================
    # TASKS
    # ==================================

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

    tasks = cur.fetchall()

    total_tasks = len(tasks)

    completed_tasks = len(
        [task for task in tasks if task[2]]
    )

    progress = (
        round((completed_tasks / total_tasks) * 100)
        if total_tasks > 0
        else 0
    )

    cur.close()
    conn.close()

    return {
        "goal": {
            "id": goal[0],
            "title": goal[1],
            "deadline": str(goal[2]),
            "priority": goal[3]
        },
        "tasks": [
            {
                "id": task[0],
                "title": task[1],
                "completed": task[2]
            }
            for task in tasks
        ],
        "progress": progress,
        "completed_tasks": completed_tasks,
        "total_tasks": total_tasks,

        "current_streak": current_streak,
        "longest_streak": longest_streak
    }