import os
from dotenv import load_dotenv
from google import genai
from config.db import get_connection

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(
    api_key=GEMINI_API_KEY
)

def generate_roadmap(title, description, deadline, priority):

        prompt = f"""
    You are an expert productivity coach.

    Goal:
    {title}

    Description:
    {description}

    Deadline:
    {deadline}

    Priority:
    {priority}

    Create a practical roadmap.

    Rules:

    - Return ONLY tasks.
    - One task per line.
    - No numbering.
    - No bullets.
    - No explanations.
    - No headings.
    - Maximum 15 tasks.
    - Tasks must match the goal domain.

    Examples:

    Goal: Study DSA

    Arrays
    Hash Maps
    Linked Lists
    Stacks
    Queues
    Trees
    Graphs
    Dynamic Programming
    Practice LeetCode Problems

    Goal: Learn React

    Learn JSX
    Learn Components
    Learn Props
    Learn State
    Learn Hooks
    Build Todo App
    Build Dashboard Project

    Goal: Build Recipe Sharing Platform

    Define Requirements
    Design Database
    Create Backend APIs
    Implement Authentication
    Build Frontend UI
    Connect Frontend and Backend
    Testing
    Deployment

    Now generate tasks for the user's goal.
    """

        try:

            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
            )

            return response.text

        except Exception as e:

            print("Gemini Error:", e)

            return """
        Research
        Planning
        Implementation
        Testing
        Deployment
        """

def generate_coach_advice(
    goal_title,
    deadline,
    priority,
    total_tasks,
    completed_tasks,
    pending_tasks
):

    prompt = f"""
You are an AI productivity coach.

Goal:
{goal_title}

Deadline:
{deadline}

Priority:
{priority}

Completed Tasks:
{completed_tasks}/{total_tasks}

Pending Tasks:
{pending_tasks}

Give:

1. Focus Recommendation
2. Risk Warning
3. Action Plan
4. Success Prediction

Keep response under 200 words.
"""

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:

        print("Coach Error:", e)

        return """
    Focus Recommendation:
    Complete your remaining tasks.

    Risk Warning:
    Avoid missing deadlines.

    Action Plan:
    Finish pending tasks one by one.

    Success Prediction:
    High chance of completion if consistency is maintained.
    """

def chat_with_ai(user_id, message):

        conn = get_connection()
        cur = conn.cursor()

        cur.execute(
            """
            SELECT
                title,
                deadline,
                priority,
                status
            FROM goals
            WHERE user_id = %s
            ORDER BY id DESC
            LIMIT 5
            """,
            (user_id,)
        )

        goals = cur.fetchall()

        cur.close()
        conn.close()

        context = ""

        for goal in goals:

            context += f"""
    Goal: {goal[0]}
    Deadline: {goal[1]}
    Priority: {goal[2]}
    Status: {goal[3]}
    """

        prompt = f"""
    You are Momentum AI Coach.

    User Goals:

    {context}

    User Question:

    {message}

    Give concise and useful coaching advice.
    """

        try:

            print("CALLING GEMINI...")

            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )

            print(response.text)

            return response.text

        except Exception as e:

            print("Chat Error:", str(e))

            return f"""
        I couldn't reach Gemini right now.

        Your active goals:

        {context}

        Recommended next step:
        Focus on the first incomplete task of your highest-priority active goal.
"""
        
def analyze_goal(title, description, deadline, priority):

    prompt = f"""
You are an AI productivity expert.

Goal:
{title}

Description:
{description}

Deadline:
{deadline}

Priority:
{priority}

Return ONLY in this format:

Success Probability: <number>
Difficulty Score: <number>
Estimated Duration: <number>
Tasks:
Task 1
Task 2
Task 3
Task 4
Task 5

Rules:
- Success Probability between 50 and 95
- Difficulty Score between 1 and 100
- Estimated Duration in days
- Exactly 5 tasks
"""

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:

        print("Analysis Error:", e)

        return """
Success Probability: 75
Difficulty Score: 60
Estimated Duration: 30
Tasks:
Research
Planning
Implementation
Testing
Deployment
"""