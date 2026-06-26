# 🚀 Momentum AI

<div align="center">

### AI-Powered Productivity & Goal Management Platform

Transform your goals into actionable roadmaps using AI, track progress with analytics, and stay accountable with intelligent productivity tools.

**🌐 Live Demo:** https://momentum-ai-opal.vercel.app

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.1-000000?logo=flask)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?logo=python&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?logo=postgresql&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Authentication-FFCA28?logo=firebase&logoColor=black)
![Google Gemini](https://img.shields.io/badge/Google-Gemini%20AI-4285F4?logo=google)
![Neon](https://img.shields.io/badge/Database-Neon-00E699)
![Render](https://img.shields.io/badge/Backend-Render-5B2BE0)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel)

</div>

---

# 📖 Overview

Momentum AI is an AI-powered productivity platform that helps users transform ambitious goals into structured execution plans.

Unlike traditional to-do applications, Momentum AI leverages Artificial Intelligence to analyze goals, generate personalized roadmaps, monitor productivity, visualize progress, and provide intelligent coaching throughout the user's journey.

The project was developed during **Vibe2Ship Hackathon 2026** under the theme:

> **The Last-Minute Life Saver**

---

# ✨ Features

## 🎯 Smart Goal Management

- Create personalized goals
- Set deadlines and priorities
- Track goal completion
- Monitor progress visually
- Manage multiple active goals

---

## 🧠 AI Goal Analysis

Before creating a goal, the AI analyzes:

- Success Probability
- Difficulty Level
- Estimated Completion Time
- Personalized Suggestions

---

## 🗺️ AI Roadmap Generation

Automatically generates a structured roadmap for every goal.

Example:

```
Goal

Learn Data Structures & Algorithms

↓

Roadmap

Week 1
• Arrays
• Strings

Week 2
• Linked Lists
• Stacks
• Queues

Week 3
• Trees
• Binary Search Trees

Week 4
• Graphs
• Dynamic Programming
```

---

## 📊 Productivity Analytics

Visualize your productivity through:

- Total Goals
- Active Goals
- Completed Goals
- Completion Percentage
- Progress Tracking
- Performance Statistics

---

## 🔥 Daily Streak System

Stay consistent with:

- Current Streak
- Longest Streak
- Daily Activity Tracking

---

## 🤖 AI Productivity Coach

Interact with an AI assistant capable of answering questions like:

- What should I work on today?
- Which goal should I prioritize?
- Am I falling behind schedule?
- How can I improve my productivity?
- How should I begin learning a new skill?

---

## 🔔 Smart Notifications

Receive notifications for:

- Goal Creation
- AI Roadmap Generation
- Important Goal Updates
- Productivity Events

---

## 🔐 Secure Authentication

- Firebase Authentication
- Google Sign-In
- Protected Routes

---

# 🏗️ System Architecture

```
                React + Vite Frontend
                        │
                        ▼
                Flask REST API Backend
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
  PostgreSQL        Gemini AI     Firebase Auth
     (Neon)          Services
```

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- React Router
- CSS3

---

## Backend

- Flask
- Python
- Gunicorn

---

## Database

- PostgreSQL
- Neon Database

---

## Authentication

- Firebase Authentication

---

## AI

- Google Gemini API

---

## Deployment

### Frontend

- Vercel

### Backend

- Render

### Database

- Neon PostgreSQL

---

# 📂 Project Structure

```
Momentum-AI
│
├── backend
│   ├── config
│   ├── routes
│   ├── services
│   ├── app.py
│   └── requirements.txt
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── firebase
│   │   ├── layouts
│   │   ├── pages
│   │   └── routes
│   │
│   ├── package.json
│   └── vite.config.js
│
├── requirements.txt
└── README.md
```

---

# 🚀 Live Deployment

### Frontend

https://momentum-ai-opal.vercel.app

### Backend API

https://momentum-ai-esxr.onrender.com

---

# ⚙️ Local Installation

## 1. Clone Repository

```bash
git clone https://github.com/utkarsh-goel18/momentum-ai.git

cd momentum-ai
```

---

## 2. Backend Setup

Install dependencies

```bash
pip install -r requirements.txt
```

Run backend

```bash
cd backend

python app.py
```

---

## 3. Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
DB_NAME=

DB_USER=

DB_PASSWORD=

DB_HOST=

DB_PORT=

GEMINI_API_KEY=
```

---

## Frontend (.env)

```env
VITE_API_URL=

VITE_FIREBASE_API_KEY=

VITE_FIREBASE_AUTH_DOMAIN=

VITE_FIREBASE_PROJECT_ID=

VITE_FIREBASE_STORAGE_BUCKET=

VITE_FIREBASE_MESSAGING_SENDER_ID=

VITE_FIREBASE_APP_ID=
```

---

# 🚀 Future Improvements

- Calendar Integration
- Smart Deadline Prediction
- AI Schedule Optimization
- Email Notifications
- Team Collaboration
- Mobile Application
- Habit Tracking
- Dark & Light Themes
- Recurring Goals
- AI Productivity Insights

---

# 👨‍💻 Developer

**Utkarsh Goel**

Electrical & Computer Engineering

Thapar Institute of Engineering & Technology

🔗 GitHub  
https://github.com/utkarsh-goel18

🔗 LinkedIn  
https://www.linkedin.com/in/utkarshgoel1801/

---

# 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### ⭐ If you found this project interesting, consider giving it a star!

Made by **Utkarsh Goel**

</div>
