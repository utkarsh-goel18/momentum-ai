from flask import Flask
from flask_cors import CORS

from config.db import get_connection

from routes.goals import goals
from routes.tasks import tasks
from routes.roadmap import roadmap
from routes.dashboard import dashboard
from routes.planner import planner
from routes.analytics import analytics
from routes.coach import coach
from routes.streaks import streaks
from routes.notifications import notifications
from routes.chatbot import chatbot
from routes.analysis import analysis

app = Flask(__name__)
CORS(app)
app.register_blueprint(goals)
app.register_blueprint(tasks)
app.register_blueprint(roadmap)
app.register_blueprint(dashboard)
app.register_blueprint(planner)
app.register_blueprint(analytics)
app.register_blueprint(coach)
app.register_blueprint(streaks)
app.register_blueprint(notifications)
app.register_blueprint(chatbot)
app.register_blueprint(analysis)

@app.route("/")
def home():
    return {
        "message": "Momentum Backend Running"
    }

@app.route("/test-db")
def test_db():
    try:
        conn = get_connection()
        cur = conn.cursor()

        cur.execute("SELECT version();")

        version = cur.fetchone()

        cur.close()
        conn.close()

        return {
            "status": "success",
            "postgres": version[0]
        }

    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

if __name__ == "__main__":
    app.run(debug=True)