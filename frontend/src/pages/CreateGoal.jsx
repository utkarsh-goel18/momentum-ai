import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";

import { useAuth } from "../context/AuthContext";
export const API_URL = import.meta.env.VITE_API_URL;

export default function CreateGoal() {

  const navigate = useNavigate();

  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");

  const [analysisLoading, setAnalysisLoading] =
    useState(false);

  const [successProbability, setSuccessProbability] =
    useState("--");

  const [difficultyScore, setDifficultyScore] =
    useState("--");

  const [estimatedDuration, setEstimatedDuration] =
    useState("--");

  const [previewTasks, setPreviewTasks] =
    useState([]);

  const [loading, setLoading] = useState(false);

  const analyzeGoal = async () => {

    if (!title || !deadline) {
      alert("Enter goal title and deadline");
      return;
    }

    try {

      setAnalysisLoading(true);

      const response = await fetch(
        `${API_URL}/goal-analysis`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title,
            description,
            deadline,
            priority
          })
        }
      );

      const data = await response.json();

      const text = data.analysis;

      const success =
        text.match(/Success Probability:\s*(\d+)/);

      const difficulty =
        text.match(/Difficulty Score:\s*(\d+)/);

      const duration =
        text.match(/Estimated Duration:\s*(\d+)/);

      setSuccessProbability(
        success ? success[1] : "--"
      );

      setDifficultyScore(
        difficulty ? difficulty[1] : "--"
      );

      setEstimatedDuration(
        duration ? duration[1] : "--"
      );

      const taskSection =
        text.split("Tasks:")[1];

      if (taskSection) {

        const tasks = taskSection
          .split("\n")
          .map(t => t.trim())
          .filter(Boolean);

        setPreviewTasks(tasks);
      }

    } catch (error) {

      console.error(error);

    } finally {

      setAnalysisLoading(false);

    }

  };

  const handleSubmit = async () => {

    setLoading(true);

    if (!title || !deadline) {
      alert("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {

      // Create Goal

      const goalResponse = await fetch(
        `${API_URL}/goals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            deadline,
            priority,
            user_id: user.uid,
          }),
        }
      );

      const goalData = await goalResponse.json();

      if (!goalResponse.ok) {
        alert(goalData.message);
        setLoading(false);
        return;
      }

      const goalId = goalData.id;

      // Generate Gemini Roadmap

      const roadmapResponse = await fetch(
        `${API_URL}/generate-roadmap`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            goal_id: goalId,
            title,
            description,
            deadline,
            priority,
          }),
        }
      );

      const roadmapData =
        await roadmapResponse.json();

      console.log(roadmapData);

      alert(
        "Mission Created & AI Roadmap Generated 🚀"
      );

      navigate(`/goal/${goalId}`);

    } catch (error) {

      console.error(error);

      alert(
        "Something went wrong"
      );

    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">

        <p className="uppercase tracking-[0.2em] text-purple-400 text-sm">
          NEW MISSION
        </p>

        <h1 className="text-7xl font-black mt-4">
          Create Goal
        </h1>

        <p className="text-slate-400 text-xl mt-4">
          Let AI build your roadmap automatically.
        </p>

        <div className="grid grid-cols-12 gap-8 mt-10">

          <div className="col-span-7">

            <Card className="p-8">

              <h2 className="text-3xl font-bold mb-8">
                Mission Details
              </h2>

              <div className="space-y-6">

                <input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Goal Name"
                  className="
                    w-full
                    bg-[#0B1730]
                    border
                    border-[#1E293B]
                    rounded-2xl
                    p-5
                    outline-none
                  "
                />

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Describe your goal..."
                  rows={5}
                  className="
                    w-full
                    bg-[#0B1730]
                    border
                    border-[#1E293B]
                    rounded-2xl
                    p-5
                    outline-none
                  "
                />

                <select
                  value={priority}
                  onChange={(e) =>
                    setPriority(e.target.value)
                  }
                  className="
                    w-full
                    bg-[#0B1730]
                    border
                    border-[#1E293B]
                    rounded-2xl
                    p-5
                    outline-none
                  "
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>

                <input
                  type="date"
                  value={deadline}
                  onChange={(e) =>
                    setDeadline(e.target.value)
                  }
                  className="
                    w-full
                    bg-[#0B1730]
                    border
                    border-[#1E293B]
                    rounded-2xl
                    p-5
                    outline-none
                  "
                />

              </div>

            </Card>

          </div>

          <div className="col-span-5">

            <Card className="p-8">

              <h2 className="text-3xl font-bold mb-8">
                AI Analysis
              </h2>

              <div className="space-y-6">

                <div>
                  <p className="text-slate-400">
                    Success Probability
                  </p>

                  <h3 className="text-5xl font-bold text-green-400 mt-2">
                    {successProbability}%
                  </h3>
                </div>

                <div>
                  <p className="text-slate-400">
                    Difficulty Score
                  </p>

                  <h3 className="text-5xl font-bold text-orange-400 mt-2">
                    {difficultyScore}
                  </h3>
                </div>

                <div>
                  <p className="text-slate-400">
                    Estimated Duration
                  </p>

                  <h3 className="text-5xl font-bold text-blue-400 mt-2">
                    {estimatedDuration} Days
                  </h3>
                </div>

              </div>

            </Card>

            <Card className="p-8 mt-8">

              <h2 className="text-3xl font-bold mb-6">
                Generated Roadmap
              </h2>

              <div className="space-y-4">

                {previewTasks.length === 0 ? (

                  <p className="text-slate-400">
                    Click Analyze Goal to generate roadmap preview.
                  </p>

                ) : (

                  previewTasks.map((task, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <span className="text-green-400">
                        ✓
                      </span>

                      <span>{task}</span>
                    </div>

                  ))

                )}

              </div>

            </Card>

          </div>

        </div>

        <div className="mt-10 flex gap-4">

          <button
            onClick={analyzeGoal}
            disabled={analysisLoading}
            className="
              px-10
              py-5
              rounded-2xl
              border
              border-purple-500
              font-bold
              text-lg
              hover:scale-105
              transition
              disabled:opacity-50
            "
          >
            {analysisLoading
              ? "Analyzing..."
              : "Analyze Goal 🤖"}
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              px-10
              py-5
              rounded-2xl
              bg-gradient-to-r
              from-purple-500
              to-blue-500
              font-bold
              text-lg
              hover:scale-105
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Generating AI Roadmap..."
              : "Launch Mission 🚀"}
          </button>

        </div>

      </div>
    </MainLayout>
  );
}