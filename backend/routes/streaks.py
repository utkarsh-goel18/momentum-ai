from flask import Blueprint
from config.db import get_connection

from datetime import date, timedelta

streaks = Blueprint("streaks", __name__)


@streaks.route("/streak/<string:user_id>", methods=["GET"])
def get_streak(user_id):

    conn = get_connection()
    cur = conn.cursor()

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

    row = cur.fetchone()

    cur.close()
    conn.close()

    if not row:
        return {
            "current_streak": 0,
            "longest_streak": 0
        }

    return {
        "current_streak": row[0],
        "longest_streak": row[1],
        "last_active": str(row[2]) if row[2] else None
    }


@streaks.route("/streak/update/<string:user_id>", methods=["PUT"])
def update_streak(user_id):

    conn = get_connection()
    cur = conn.cursor()

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

    row = cur.fetchone()

    today = date.today()

    if not row:

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

        conn.commit()

        cur.close()
        conn.close()

        return {
            "current_streak": 1
        }

    current_streak = row[0]
    longest_streak = row[1]
    last_active = row[2]

    if last_active == today:

        cur.close()
        conn.close()

        return {
            "current_streak": current_streak
        }

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

    conn.commit()

    cur.close()
    conn.close()

    return {
        "current_streak": current_streak,
        "longest_streak": longest_streak
    }