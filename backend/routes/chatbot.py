from flask import Blueprint, request

from services.gemini_service import chat_with_ai
from services.gemini_service import client

chatbot = Blueprint("chatbot", __name__)


@chatbot.route("/ai-chat", methods=["POST"])
def ai_chat():

    data = request.json

    user_id = data.get("user_id")
    message = data.get("message")

    if not user_id:
        return {
            "message": "user_id is required"
        }, 400

    if not message:
        return {
            "message": "message is required"
        }, 400

    try:

        response = chat_with_ai(
            user_id,
            message
        )

        return {
            "response": response
        }

    except Exception as e:

        print("Chatbot Error:", e)

        return {
            "response":
            "Sorry, AI Coach is currently unavailable."
        }, 500
