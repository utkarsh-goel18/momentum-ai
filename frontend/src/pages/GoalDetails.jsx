import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";
import ProgressRing from "../components/ProgressRing";
import { API_URL } from "../config";

export default function GoalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [goal, setGoal] = useState(null);
  const [roadmap, setRoadmap] = useState("");

  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");
  const [tasks, setTasks] = useState([]);

  const totalTasks = tasks.length;

  const completedTasks =
    tasks.filter(task => task.completed).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  useEffect(() => {
    fetchGoal();
    fetchRoadmap();
    fetchTasks();
  }, []);

  const fetchGoal = async () => {
    try {
      const response = await fetch(
        `${API_URL}/goals/${id}`
      );

      const data = await response.json();

      setGoal(data);

      setTitle(data.title);
      setDescription(data.description || "");
      setDeadline(data.deadline || "");
      setPriority(data.priority || "Medium");

    } catch (error) {
      console.error(error);
    }
  };

  const fetchRoadmap = async () => {

    try {

      const response = await fetch(
        `${API_URL}/roadmap/${id}`
      );

      const data = await response.json();

      if (response.ok) {
        setRoadmap(data.roadmap);
      }

    } catch (error) {

      console.error(error);

    }
  };

  const fetchTasks = async () => {

    try {

      const response = await fetch(
        `${API_URL}/tasks/${id}`
      );

      const data = await response.json();

      setTasks(data);

    } catch (error) {

      console.error(error);

    }

  };

  const toggleTask = async (taskId) => {

    try {

      await fetch(
        `${API_URL}/tasks/${taskId}/toggle`,
        {
          method: "PUT",
        }
      );

      fetchTasks();

    } catch (error) {

      console.error(error);

    }

  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this mission?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `${API_URL}/goals/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Mission deleted");
        navigate("/goals");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const handleUpdate = async () => {
    try {

      const response = await fetch(
        `${API_URL}/goals/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            deadline,
            priority,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Mission updated");

        setGoal({
          ...goal,
          title,
          description,
          deadline,
          priority,
        });

        setIsEditing(false);

      } else {

        alert(data.message);

      }

    } catch (error) {

      console.error(error);

      alert("Update failed");

    }
  };

  if (!goal) {
    return (
      <MainLayout>
        <div className="p-10 text-2xl">
          Loading Mission...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <p className="uppercase tracking-[0.2em] text-purple-400 text-sm">
          MISSION DETAILS
        </p>

        <div className="flex justify-between items-start mt-4">

          <h1
            className="
              text-4xl
              md:text-5xl
              xl:text-6xl
              font-black
              break-words
              max-w-4xl
            "
          >
            {isEditing ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="
                  bg-[#0B1730]
                  border
                  border-slate-700
                  rounded-xl
                  px-4
                  py-3
                  text-3xl
                  font-bold
                  w-full
                "
              />
            ) : (
              goal.title
            )}
          </h1>

          <div className="flex gap-3">

            <button
              onClick={handleDelete}
              className="
                px-6
                py-3
                rounded-xl
                bg-red-500/20
                border
                border-red-500/40
                text-red-400
              "
            >
              Delete Mission
            </button>

            <button
              onClick={() =>
                isEditing
                  ? handleUpdate()
                  : setIsEditing(true)
              }
              className="
                px-6
                py-3
                rounded-xl
                bg-blue-500/20
                border
                border-blue-500/40
                text-blue-400
              "
            >
              {isEditing
                ? "Save Changes"
                : "Edit Mission"}
            </button>

          </div>

        </div>

        <p className="text-slate-400 text-xl mt-4">
          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={4}
              className="
                w-full
                mt-4
                bg-[#0B1730]
                border
                border-slate-700
                rounded-xl
                p-4
              "
            />
          ) : (
            goal.description ||
            "No description available."
          )}
        </p>

        {/* Hero */}

        <Card className="mt-10 p-10">

          <div className="grid grid-cols-12 gap-8 items-center">

            <div className="col-span-8">

              <p className="text-purple-400 uppercase tracking-widest">
                Mission Status
              </p>

              <h2 className="text-5xl xl:text-6xl font-black mt-4">
                {progress >= 80
                  ? "On Track 🚀"
                  : progress >= 40
                  ? "In Progress ⚡"
                  : "Needs Focus 🔥"}
              </h2>

              <p className="text-slate-400 text-xl mt-5 max-w-2xl">
                {progress >= 80
                  ? "Excellent progress. You're very close to completing this mission."
                  : progress >= 40
                  ? "Steady progress detected. Keep maintaining momentum."
                  : "This mission requires more attention to stay on schedule."}
              </p>

            </div>

            <div className="col-span-4 flex justify-center">

              <ProgressRing percentage={progress} />

            </div>

          </div>

        </Card>

        {/* Stats */}

        <div className="grid grid-cols-4 gap-6 mt-8">

          <Card className="p-8">

            <p className="text-slate-400">
              Mission Progress
            </p>

            <h2 className="text-5xl font-bold text-green-400 mt-3">
              {progress}%
            </h2>

          </Card>

          <Card className="p-8">

            <p className="text-slate-400">
              Deadline
            </p>

            <h2 className="text-3xl font-bold mt-3">
              {goal.deadline || "N/A"}
            </h2>

          </Card>

          <Card className="p-8">

            <p className="text-slate-400">
              Priority
            </p>

            <h2 className="text-4xl font-bold mt-3 text-orange-400">
              {goal.priority}
            </h2>

          </Card>

          <Card className="p-8">

            <p className="text-slate-400">
              Completed Tasks
            </p>

            <h2 className="text-5xl font-bold text-blue-400 mt-3">
              {completedTasks}/{totalTasks}
            </h2>

          </Card>

        </div>
        

        <div className="mt-10">

          <h2 className="text-4xl font-bold mb-6">
            AI Generated Roadmap
          </h2>

          <Card className="p-8">

            {roadmap ? (

              <div className="space-y-3">

                {roadmap
                  .split("\n")
                  .filter(task => task.trim() !== "")
                  .map((task, index) => (

                    <div
                      key={index}
                      className="
                        flex
                        items-center
                        gap-4

                        p-4

                        rounded-2xl

                        bg-[#0B1730]
                        border
                        border-[#1E293B]

                        hover:border-purple-500/40
                        transition
                      "
                    >

                      <div
                        className="
                          h-3
                          w-3
                          rounded-full
                          bg-purple-400
                        "
                      />

                      <span className="text-slate-200">
                        {task}
                      </span>

                    </div>

                  ))}

              </div>

            ) : (

              <p className="text-slate-500">
                No roadmap generated yet.
              </p>

            )}

          </Card>

        </div>

        {/* Content */}

        <div className="grid grid-cols-12 gap-8 mt-10">

          {/* Left */}

          <div className="col-span-8">

            <h2 className="text-4xl font-bold mb-6">
              Mission Timeline
            </h2>

            <div className="space-y-5">

              {tasks.length === 0 ? (

                <Card className="p-6">
                  <p className="text-slate-400">
                    No tasks generated yet.
                  </p>
                </Card>

              ) : (

                tasks.map((task) => (

                  <Card
                    key={task.id}
                    className="
                      p-6
                      hover:-translate-y-1
                      transition
                    "
                  >

                    <div className="flex items-center gap-4">

                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                          toggleTask(task.id)
                        }
                        className="
                          h-5
                          w-5
                          accent-purple-500
                        "
                      />

                      <span
                        className={`text-xl ${
                          task.completed
                            ? "line-through text-slate-500"
                            : "text-white"
                        }`}
                      >
                        {task.title}
                      </span>

                    </div>

                  </Card>

                ))

              )}

            </div>

          </div>

          {/* Right */}

          <div className="col-span-4">

            <h2 className="text-4xl font-bold mb-6">
              AI Insights
            </h2>

            <div className="space-y-5">

              <Card className="p-6 border border-green-500/30">

                <h3 className="text-xl font-bold">
                  Success Boost
                </h3>

                <p className="text-slate-400 mt-2">
                  Consistent daily progress increases
                  completion probability significantly.
                </p>

              </Card>

              <Card className="p-6 border border-red-500/30">

                <h3 className="text-xl font-bold">
                  Risk Alert
                </h3>

                <p className="text-slate-400 mt-2">
                  Missing multiple sessions may delay
                  your target completion date.
                </p>

              </Card>

              <Card className="p-6 border border-blue-500/30">

                <h3 className="text-xl font-bold">
                  Recommendation
                </h3>

                <p className="text-slate-400 mt-2">
                  Focus on high-impact tasks first
                  for maximum momentum.
                </p>

              </Card>

            </div>

          </div>

        </div>

                {progress === 100 && (

          <div className="mt-10">

            <Card className="p-8 border border-green-500/40">

              <h2 className="text-3xl font-bold text-green-400">
                🎉 Mission Accomplished
              </h2>

              <p className="text-slate-400 mt-2">
                All tasks completed successfully.
              </p>

            </Card>

          </div>

        )}

      </div>
    </MainLayout>
  );
}