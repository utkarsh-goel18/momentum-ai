from flask import Blueprint, request

from services.gemini_service import analyze_goal

analysis = Blueprint("analysis", __name__)

@analysis.route("/goal-analysis", methods=["POST"])
def goal_analysis():

    data = request.json

    result = analyze_goal(
        data["title"],
        data["description"],
        data["deadline"],
        data["priority"]
    )

    return {
        "analysis": result
    }