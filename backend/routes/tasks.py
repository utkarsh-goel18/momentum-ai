from flask import Blueprint, request
from config.db import get_connection

tasks = Blueprint("tasks", __name__)

# ==================================
# CREATE TASK
# ==================================

@tasks.route("/tasks", methods=["POST"])
def create_task():

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO tasks
        (
            goal_id,
            title
        )
        VALUES (%s,%s)
        RETURNING id
        """,
        (
            data["goal_id"],
            data["title"]
        )
    )

    task_id = cur.fetchone()[0]

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Task created",
        "id": task_id
    }


# ==================================
# GET TASKS OF A GOAL
# ==================================

@tasks.route("/tasks/<int:goal_id>", methods=["GET"])
def get_tasks(goal_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT
            id,
            title,
            completed,
            created_at
        FROM tasks
        WHERE goal_id = %s
        ORDER BY id ASC
        """,
        (goal_id,)
    )

    rows = cur.fetchall()

    cur.close()
    conn.close()

    result = []

    for row in rows:
        result.append({
            "id": row[0],
            "title": row[1],
            "completed": row[2],
            "created_at": str(row[3])
        })

    return result


# ==================================
# UPDATE TASK
# ==================================

@tasks.route("/tasks/<int:task_id>", methods=["PUT"])
def update_task(task_id):

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE tasks
        SET completed = %s
        WHERE id = %s
        RETURNING id
        """,
        (
            data["completed"],
            task_id
        )
    )

    updated = cur.fetchone()

    conn.commit()

    cur.close()
    conn.close()

    if not updated:
        return {
            "message": "Task not found"
        }, 404

    return {
        "message": "Task updated"
    }


# ==================================
# TOGGLE TASK
# ==================================

@tasks.route("/tasks/<int:task_id>/toggle", methods=["PUT"])
def toggle_task(task_id):

    from datetime import date, timedelta

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE tasks
        SET completed = NOT completed
        WHERE id = %s
        RETURNING goal_id, completed
        """,
        (task_id,)
    )

    result = cur.fetchone()

    if not result:
        return {
            "message": "Task not found"
        }, 404

    goal_id = result[0]
    completed = result[1]

    # =========================
    # STREAK UPDATE
    # ONLY when task becomes completed
    # =========================

    if completed:

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
            SELECT
                current_streak,
                longest_streak,
                last_active
            FROM streaks
            WHERE user_id = %s
            """,
            (user_id,)
        )

        streak = cur.fetchone()

        today = date.today()

        if not streak:

            cur.execute(
                """
                INSERT INTO streaks
                (
                    user_id,
                    current_streak,
                    longest_streak,
                    last_active
                )
                VALUES (%s,%s,%s,%s)
                """,
                (
                    user_id,
                    1,
                    1,
                    today
                )
            )

        else:

            current_streak = streak[0]
            longest_streak = streak[1]
            last_active = streak[2]

            if last_active != today:

                if last_active == today - timedelta(days=1):

                    current_streak += 1

                else:

                    current_streak = 1

                longest_streak = max(
                    longest_streak,
                    current_streak
                )

                cur.execute(
                    """
                    UPDATE streaks
                    SET
                        current_streak = %s,
                        longest_streak = %s,
                        last_active = %s
                    WHERE user_id = %s
                    """,
                    (
                        current_streak,
                        longest_streak,
                        today,
                        user_id
                    )
                )

    # =========================
    # GOAL STATUS UPDATE
    # =========================

    cur.execute(
        """
        SELECT COUNT(*)
        FROM tasks
        WHERE goal_id = %s
        """,
        (goal_id,)
    )

    total_tasks = cur.fetchone()[0]

    cur.execute(
        """
        SELECT COUNT(*)
        FROM tasks
        WHERE goal_id = %s
        AND completed = TRUE
        """,
        (goal_id,)
    )

    completed_tasks = cur.fetchone()[0]

    status = (
        "completed"
        if total_tasks == completed_tasks
        else "active"
    )

    cur.execute(
        """
        UPDATE goals
        SET status = %s
        WHERE id = %s
        """,
        (
            status,
            goal_id
        )
    )

    # =========================
    # NOTIFICATION
    # =========================

    if status == "completed":

        cur.execute(
            """
            SELECT
                user_id,
                title
            FROM goals
            WHERE id = %s
            """,
            (goal_id,)
        )

        goal_info = cur.fetchone()

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
                goal_info[0],
                f"🎉 Mission completed: {goal_info[1]}"
            )
        )    

    conn.commit()

    cur.close()
    conn.close()

    return {
        "status": status
    }


# ==================================
# DELETE TASK
# ==================================

@tasks.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        DELETE FROM tasks
        WHERE id = %s
        RETURNING id
        """,
        (task_id,)
    )

    deleted = cur.fetchone()

    conn.commit()

    cur.close()
    conn.close()

    if not deleted:
        return {
            "message": "Task not found"
        }, 404

    return {
        "message": "Task deleted"
    }

@tasks.route("/goal-progress/<int:goal_id>", methods=["GET"])
def goal_progress(goal_id):

    conn = get_connection()
    cur = conn.cursor()

    # Total Tasks
    cur.execute(
        """
        SELECT COUNT(*)
        FROM tasks
        WHERE goal_id = %s
        """,
        (goal_id,)
    )

    total_tasks = cur.fetchone()[0]

    # Completed Tasks
    cur.execute(
        """
        SELECT COUNT(*)
        FROM tasks
        WHERE goal_id = %s
        AND completed = TRUE
        """,
        (goal_id,)
    )

    completed_tasks = cur.fetchone()[0]

    cur.close()
    conn.close()

    progress = 0

    if total_tasks > 0:
        progress = round(
            (completed_tasks / total_tasks) * 100
        )

    return {
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "progress": progress
    }