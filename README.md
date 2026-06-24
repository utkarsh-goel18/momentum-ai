# Momentum AI
### Your Personal AI Accountability & Productivity Agent

> Stop missing deadlines. Start achieving goals.

Momentum AI is an AI-powered productivity companion designed to help students, professionals, and entrepreneurs plan, prioritize, and complete their goals before deadlines are missed. Unlike traditional task managers that rely on passive reminders, Momentum AI actively assists users by generating personalized plans, monitoring progress, adapting schedules, and providing intelligent recommendations.

Built for the Vibe2Ship Hackathon 2026 under the problem statement **"The Last-Minute Life Saver"**.

---

## Problem Statement

Students, professionals, and entrepreneurs frequently miss deadlines, assignments, meetings, bill payments, interviews, and important commitments. Existing productivity tools often rely on passive reminders that are easy to ignore and do little to help users actually complete their tasks.

Momentum AI transforms productivity from task tracking into goal achievement by acting as an intelligent accountability partner.

---

## Key Idea

Traditional Productivity Apps:

Task → Reminder → Ignore → Miss Deadline

Momentum AI:

Goal → AI Planning → Task Breakdown → Daily Action Plan → Progress Tracking → Risk Analysis → Automatic Replanning

Instead of simply reminding users about tasks, Momentum AI helps them determine:

- What to do next
- What is most important
- Whether they are on track
- What happens if they fall behind
- How to recover from missed work

---

# Features

## 1. AI Goal Planning

Users describe a goal in natural language.

### Example

Input:

```text
I want to prepare DSA for placements in 60 days.
```

AI generates:

- Goal timeline
- Estimated effort
- Required milestones
- Success probability

---

## 2. Intelligent Task Decomposition

Large goals are automatically broken into manageable tasks.

### Example

Goal:

```text
Prepare for DSA Interviews
```

Generated Tasks:

- Arrays
- Strings
- Linked Lists
- Stacks & Queues
- Trees
- Graphs
- Dynamic Programming
- Mock Interviews

---

## 3. Smart Prioritization Engine

When multiple tasks compete for attention, Momentum AI determines what should be completed first based on:

- Deadline urgency
- Goal importance
- Estimated effort
- Available time

### Example

Tasks:

- Assignment due tomorrow
- Mid-sem exam next week
- Internship application next month

Priority:

1. Assignment
2. Exam Preparation
3. Internship Application

---

## 4. Personalized Daily Action Plans

Every day, users receive a customized action plan based on:

- Active goals
- Deadlines
- Available study/work hours
- Previous progress

### Example

Today's Plan:

- Complete Physics Assignment
- Solve 10 Array Problems
- Attend Gym Session

Estimated Time: 4.5 Hours

---

## 5. AI Accountability Agent

At the end of each day, Momentum AI checks progress.

Users can mark:

- Completed
- Partially Completed
- Missed

The AI then updates future schedules accordingly.

---

## 6. Dynamic Replanning

When users miss tasks, Momentum AI automatically adjusts schedules.

### Example

User misses:

```text
2 Hours of DSA Practice
```

AI Response:

```text
Arrays moved to tomorrow.
Trees shifted to Friday.
Success probability reduced from 84% to 78%.
```

---

## 7. Goal Risk Prediction

Momentum AI continuously evaluates whether users are likely to achieve their goals.

### Dashboard Metrics

- Goal Completion Probability
- Productivity Score
- Consistency Index
- Missed Task Trends

---

## 8. AI Productivity Coach

Users can chat with Momentum AI and ask questions such as:

- Can I still finish this goal?
- What should I prioritize today?
- Am I falling behind?
- How can I improve productivity?

The AI provides personalized recommendations based on user progress.

---

# Tech Stack

## Frontend

- React.js
- Tailwind CSS
- React Router

## Backend

- Flask
- Python

## Database

- Firebase Firestore

## Authentication

- Firebase Authentication
- Google Sign-In

## AI Layer

- Google Gemini API
- Google AI Studio

## Deployment

- Google AI Studio Deployment
- Firebase Hosting (Optional)

---

# Google Technologies Used

This project heavily utilizes Google technologies as required by the hackathon guidelines:

- Gemini API
- Google AI Studio
- Firebase Authentication
- Firebase Firestore

---

# System Architecture

```text
+----------------------+
|      React App       |
+----------+-----------+
           |
           v
+----------------------+
|      Flask API       |
+----------+-----------+
           |
           +-------------------+
           |                   |
           v                   v
+----------------+    +----------------+
| Gemini API     |    | Firebase       |
| AI Agents      |    | Firestore      |
+----------------+    +----------------+
```

---

# AI Agent Architecture

Momentum AI consists of multiple specialized agents.

## Planner Agent

Responsible for:

- Goal analysis
- Timeline creation
- Task generation

---

## Prioritization Agent

Responsible for:

- Ranking tasks
- Time allocation
- Urgency analysis

---

## Recovery Agent

Responsible for:

- Schedule rebuilding
- Missed task recovery
- Deadline protection

---

## Coach Agent

Responsible for:

- Daily guidance
- Motivation
- Productivity recommendations

---

# Database Structure

## Users

```json
{
  "uid": "",
  "name": "",
  "email": "",
  "createdAt": ""
}
```

## Goals

```json
{
  "title": "",
  "description": "",
  "deadline": "",
  "status": "active"
}
```

## Tasks

```json
{
  "goalId": "",
  "title": "",
  "estimatedHours": 4,
  "status": "pending"
}
```

## Daily Logs

```json
{
  "taskId": "",
  "completed": true,
  "date": ""
}
```

---

# User Flow

1. Login using Google
2. Create a Goal
3. AI generates a plan
4. User follows daily tasks
5. AI monitors progress
6. AI adjusts schedules when necessary
7. User tracks performance through dashboard
8. AI coach provides continuous guidance

---

# Future Enhancements

- Google Calendar Integration
- Voice Assistant
- Mobile Application
- Wearable Device Integration
- Smart Notifications
- Team Collaboration
- Habit Tracking
- AI Study Companion

---

# Impact

Momentum AI helps users:

- Reduce missed deadlines
- Improve consistency
- Make better decisions
- Stay accountable
- Achieve long-term goals

By moving beyond passive reminders and enabling proactive AI assistance, Momentum AI transforms productivity into a personalized, adaptive, and intelligent experience.

---

# Hackathon Information

Hackathon: Vibe2Ship 2026

Problem Statement:
The Last-Minute Life Saver

Theme:
AI-Powered Productivity & Goal Management

Developed using:
Google Gemini, Google AI Studio, Firebase, React, Flask

---