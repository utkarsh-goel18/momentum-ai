from flask import Blueprint
from config.db import get_connection

notifications = Blueprint("notifications", __name__)

@notifications.route("/notifications/<string:user_id>", methods=["GET"])
def get_notifications(user_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT
            id,
            message,
            is_read,
            created_at
        FROM notifications
        WHERE user_id = %s
        ORDER BY created_at DESC
        """,
        (user_id,)
    )

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return [
        {
            "id": row[0],
            "message": row[1],
            "is_read": row[2],
            "created_at": str(row[3])
        }
        for row in rows
    ]

@notifications.route("/notifications/<int:notification_id>/read", methods=["PUT"])
def mark_read(notification_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE notifications
        SET is_read = TRUE
        WHERE id = %s
        """,
        (notification_id,)
    )

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "Notification marked as read"
    }

@notifications.route(
    "/notifications/<string:user_id>/unread-count",
    methods=["GET"]
)
def unread_count(user_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT COUNT(*)
        FROM notifications
        WHERE user_id = %s
        AND is_read = FALSE
        """,
        (user_id,)
    )

    count = cur.fetchone()[0]

    cur.close()
    conn.close()

    return {
        "count": count
    }

@notifications.route(
    "/notifications/<string:user_id>/read-all",
    methods=["PUT"]
)
def mark_all_read(user_id):

    conn = get_connection()
    cur = conn.cursor()

    cur.execute(
        """
        UPDATE notifications
        SET is_read = TRUE
        WHERE user_id = %s
        """,
        (user_id,)
    )

    conn.commit()

    cur.close()
    conn.close()

    return {
        "message": "All notifications marked as read"
    }