from flask import Blueprint
from config.db import get_connection

analytics = Blueprint("analytics", __name__)

@analytics.route("/analytics/<string:user_id>", methods=["GET"])
def get_analytics(user_id):

    conn = get_connection()
    cur = conn.cursor()

    # Total goals
    cur.execute(
        """
        SELECT COUNT(*)
        FROM goals
        WHERE user_id = %s
        """,
        (user_id,)
    )

    total_goals = cur.fetchone()[0]

    # Active goals
    cur.execute(
        """
        SELECT COUNT(*)
        FROM goals
        WHERE user_id = %s
        AND status = 'active'
        """,
        (user_id,)
    )

    active_goals = cur.fetchone()[0]

    # Completed goals
    cur.execute(
        """
        SELECT COUNT(*)
        FROM goals
        WHERE user_id = %s
        AND status = 'completed'
        """,
        (user_id,)
    )

    completed_goals = cur.fetchone()[0]

    # Total tasks
    cur.execute(
        """
        SELECT COUNT(*)
        FROM tasks t
        JOIN goals g
        ON t.goal_id = g.id
        WHERE g.user_id = %s
        """,
        (user_id,)
    )

    total_tasks = cur.fetchone()[0]

    # Completed tasks
    cur.execute(
        """
        SELECT COUNT(*)
        FROM tasks t
        JOIN goals g
        ON t.goal_id = g.id
        WHERE g.user_id = %s
        AND t.completed = true
        """,
        (user_id,)
    )

    completed_tasks = cur.fetchone()[0]

    completion_rate = (
        round((completed_tasks / total_tasks) * 100)
        if total_tasks > 0
        else 0
    )

    productivity_score = completion_rate

    # Mission breakdown
    cur.execute(
        """
        SELECT
            g.id,
            g.title,

            COUNT(t.id) AS total_tasks,

            COALESCE(
                SUM(
                    CASE
                        WHEN t.completed = true
                        THEN 1
                        ELSE 0
                    END
                ),
                0
            ) AS completed_tasks

        FROM goals g

        LEFT JOIN tasks t
        ON g.id = t.goal_id

        WHERE g.user_id = %s

        GROUP BY g.id, g.title

        ORDER BY g.id DESC
        """,
        (user_id,)
    )

    rows = cur.fetchall()

    missions = []

    for row in rows:

        total = row[2]
        completed = row[3]

        progress = (
            round((completed / total) * 100)
            if total > 0
            else 0
        )

        missions.append({
            "id": row[0],
            "title": row[1],
            "progress": progress
        })

    cur.close()
    conn.close()

    return {
        "total_goals": total_goals,
        "active_goals": active_goals,
        "completed_goals": completed_goals,
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "completion_rate": completion_rate,
        "productivity_score": productivity_score,
        "missions": missions
    }