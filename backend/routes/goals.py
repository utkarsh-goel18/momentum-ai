from flask import Blueprint, request
from config.db import get_connection

goals = Blueprint("goals", __name__)

@goals.route("/goals", methods=["POST"])
def create_goal():

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        INSERT INTO goals
        (
            title,
            description,
            deadline,
            priority,
            user_id
        )
        VALUES (%s,%s,%s,%s,%s)
        RETURNING id;
        """,
        (
            data["title"],
            data["description"],
            data["deadline"],
            data["priority"],
            data["user_id"]
        )
    )

    goal_id = cur.fetchone()[0]

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
            data["user_id"],
            f"🚀 New mission created: {data['title']}"
        )
    )

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Goal created",
        "id": goal_id
    }

@goals.route("/goals", methods=["GET"])
def get_goals():

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            id,
            title,
            description,
            deadline,
            priority,
            created_at
        FROM goals
        ORDER BY id DESC
    """)

    rows = cur.fetchall()

    cur.close()
    conn.close()

    result = []

    for row in rows:
        result.append({
            "id": row[0],
            "title": row[1],
            "description": row[2],
            "deadline": str(row[3]) if row[3] else None,
            "priority": row[4],
            "created_at": str(row[5])
        })

    return result

@goals.route("/goals/<int:goal_id>", methods=["GET"])
def get_goal(goal_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT
            id,
            title,
            description,
            deadline,
            priority,
            created_at
        FROM goals
        WHERE id = %s
    """, (goal_id,))

    row = cur.fetchone()

    cur.close()
    conn.close()

    if not row:
        return {
            "message": "Goal not found"
        }, 404

    return {
        "id": row[0],
        "title": row[1],
        "description": row[2],
        "deadline": str(row[3]) if row[3] else None,
        "priority": row[4],
        "created_at": str(row[5])
    }

@goals.route("/user-goals/<string:user_id>", methods=["GET"])
def get_user_goals(user_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT
            id,
            title,
            description,
            deadline,
            priority,
            created_at,
            status
        FROM goals
        WHERE user_id = %s
        ORDER BY id DESC
        """,
        (user_id,)
    )

    rows = cur.fetchall()

    result = []

    for row in rows:

        goal_id = row[0]

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

        progress = (
            round(
                (completed_tasks / total_tasks) * 100
            )
            if total_tasks > 0
            else 0
        )

        result.append({
            "id": row[0],
            "title": row[1],
            "description": row[2],
            "deadline": str(row[3]) if row[3] else None,
            "priority": row[4],
            "created_at": str(row[5]),
            "status": row[6],
            "progress": progress,
            "completed_tasks": completed_tasks,
            "total_tasks": total_tasks
        })

    cur.close()
    conn.close()

    return result

@goals.route("/goals/<int:goal_id>", methods=["DELETE"])
def delete_goal(goal_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        DELETE FROM goals
        WHERE id = %s
        RETURNING id
        """,
        (goal_id,)
    )

    deleted = cur.fetchone()

    conn.commit()

    cur.close()
    conn.close()

    if not deleted:
        return {
            "message": "Goal not found"
        }, 404

    return {
        "message": "Goal deleted"
    }

@goals.route("/goals/<int:goal_id>", methods=["PUT"])
def update_goal(goal_id):

    data = request.json

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE goals
        SET
            title = %s,
            description = %s,
            deadline = %s,
            priority = %s
        WHERE id = %s
        RETURNING id
        """,
        (
            data["title"],
            data["description"],
            data["deadline"],
            data["priority"],
            goal_id
        )
    )

    updated = cur.fetchone()

    conn.commit()

    cur.close()
    conn.close()

    if not updated:
        return {
            "message": "Goal not found"
        }, 404

    return {
        "message": "Goal updated"
    }