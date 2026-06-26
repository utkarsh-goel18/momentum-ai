import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProgressRing from "../components/ProgressRing";
import GoalCard from "../components/GoalCard";
import TaskCard from "../components/TaskCard";
import InsightCard from "../components/InsightCard";

import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    if (user) {
      fetchDashboard();
    }
  }, [user]);

  const fetchDashboard = async () => {
    try {

      const response = await fetch(
        `${API_URL}/dashboard/${user.uid}`
      );

      const data = await response.json();

      setDashboard(data);

    } catch (error) {

      console.error(error);

    }
  };

  if (!dashboard) {
    return (
      <MainLayout>
        <div className="p-10 text-2xl">
          Loading Dashboard...
        </div>
      </MainLayout>
    );
  }

  if (!dashboard.goal) {
    return (
      <MainLayout>

        <div className="max-w-5xl mx-auto text-center mt-20">

          <h1 className="text-6xl font-black mb-6">
            No Active Mission
          </h1>

          <p className="text-slate-400 text-xl mb-10">
            Create a mission and let Momentum AI track your progress.
          </p>

          <button
            onClick={() => navigate("/goal/new")}
            className="
              px-8
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-purple-600
              to-blue-600
              text-white
              font-semibold
            "
          >
            Create Your First Mission
          </button>

        </div>

      </MainLayout>
    );
  }

  return (
    <MainLayout>

      {/* HERO */}

      <div
        className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-slate-800
        bg-[#0A1224]/80
        backdrop-blur-xl
        p-14
        mb-10
      "
      >
        <div
          className="
          absolute
          -top-20
          -right-20
          h-72
          w-72
          rounded-full
          bg-purple-600/20
          blur-[120px]
        "
        />

        <div
          className="
          absolute
          bottom-0
          left-0
          h-60
          w-60
          rounded-full
          bg-blue-500/10
          blur-[100px]
        "
        />

        <div className="grid grid-cols-7 gap-10 items-center relative z-10">

          {/* LEFT */}

          <div className="col-span-5">

            <p className="text-purple-400 uppercase tracking-widest text-sm mb-3">
              Mission Status
            </p>

            <div className="flex items-center gap-6 mb-4">

              <div>
                <h1
                  className="
                  text-7xl
                  font-black
                  leading-none
                  bg-gradient-to-r
                  from-white
                  via-slate-100
                  to-purple-300
                  bg-clip-text
                  text-transparent
                  "
                >
                  {
                    dashboard.progress >= 80
                      ? "On Track"
                      : dashboard.progress >= 40
                      ? "In Progress"
                      : "Needs Focus"
                  }
                </h1>

                <p className="text-slate-400 text-lg mt-3">
                  Welcome back,
                  <span className="text-white font-semibold ml-2">
                    {user?.displayName || "Commander"}
                  </span>
                </p>
              </div>

              <span className="text-6xl animate-bounce">
                🚀
              </span>

            </div>

            <p className="text-slate-400 text-lg mb-8 max-w-2xl">
              Your AI predicts a {
                Math.min(
                  dashboard.progress + 15,
                  100
                )
              }% chance of successfully completing your primary mission.
            </p>

            <div className="grid grid-cols-2 gap-4">

              <div
                className="
                bg-slate-900/60
                rounded-2xl
                p-4
                hover:scale-[1.02]
                transition
                "
              >
                <p className="text-slate-400 text-sm">
                  Current Goal
                </p>

                <h3 className="text-xl font-semibold mt-1">
                  {dashboard.goal?.title || "No Active Mission"}
                </h3>
              </div>

              <div
                className="
                bg-slate-900/60
                rounded-2xl
                p-4
                hover:scale-[1.02]
                transition
                "
              >
                <p className="text-slate-400 text-sm">
                  Next Session
                </p>

                <h3 className="text-xl font-semibold mt-1">
                  {
                    dashboard.tasks.find(
                      task => !task.completed
                    )?.title || "Mission Complete 🎉"
                  }
                </h3>
              </div>

              <div
                className="
                bg-slate-900/60
                rounded-2xl
                p-4
                hover:scale-[1.02]
                transition
                "
              >
                <p className="text-slate-400 text-sm">
                  Current Streak
                </p>

                <h3 className="text-3xl font-bold text-orange-400">
                  🔥 {dashboard.current_streak}
                </h3>

              </div>

              <div
                className="
                bg-slate-900/60
                rounded-2xl
                p-4
                hover:scale-[1.02]
                transition
                "
              >
                <p className="text-slate-400 text-sm">
                  Longest Streak
                </p>

                <h3 className="text-3xl font-bold text-yellow-400">
                  🏆 {dashboard.longest_streak}
                </h3>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="col-span-2 flex justify-center">

            <div
              className="
              bg-slate-900/70
              p-8
              rounded-[32px]
              border
              border-slate-800
              hover:border-purple-500/50
              transition-all
              duration-300
            "
            >
              <div className="flex justify-center mb-4">

                <img
                  src={
                    user?.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.displayName || "User"
                    )}`
                  }
                  alt="profile"
                  className="
                  h-16
                  w-16
                  rounded-full
                  border-2
                  border-purple-500
                  "
                />

              </div>

              <ProgressRing
                percentage={dashboard.progress}
              />

              <h3 className="text-center text-2xl font-bold mt-6">
                Mission Progress
              </h3>

              <p className="text-center text-slate-400 mt-2">
                Predicted Success: {
                  Math.min(
                    dashboard.progress + 15,
                    100
                  )
                }%
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* SECOND ROW */}

      <div className="grid grid-cols-3 gap-6">

        <div className="col-span-2">

          <h2 className="text-3xl font-bold mb-5">
            Mission Timeline
          </h2>

          <div className="space-y-4">

            {dashboard.tasks.map((task) => (

              <TaskCard
                key={task.id}
                title={task.title}
                time={
                  task.completed
                    ? "Completed"
                    : "Pending"
                }
                category="Mission"
              />

            ))}

          </div>

        </div>

        <div>

          <h2 className="text-3xl font-bold mb-5">
            AI Command Center
          </h2>

          <div className="space-y-4">

            <InsightCard
              title="Success Boost"
              message={`${dashboard.completed_tasks} of ${dashboard.total_tasks} tasks completed.`}
              color="green"
            />

            <InsightCard
              title="Risk Detected"
              message={`${dashboard.total_tasks - dashboard.completed_tasks} tasks still pending.`}
              color="red"
            />

            <InsightCard
              title="Recommended Action"
              message="Complete remaining mission tasks to reach 100%."
              color="blue"
            />

          </div>

        </div>

      </div>

      {/* GOALS */}

      <div className="mt-12">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            Active Missions
          </h2>

          <button
            onClick={() => navigate("/goals")}
            className="
              text-purple-400
              hover:text-purple-300
              transition
            "
          >
            View All
          </button>

        </div>

        <div className="space-y-5">
          
          {dashboard.goal && (

            <div
              onClick={() =>
                navigate(`/goal/${dashboard.goal.id}`)
              }
              className="cursor-pointer"
            >

              <GoalCard
                title={dashboard.goal.title}
                daysLeft={
                  Math.max(
                    0,
                    Math.ceil(
                      (
                        new Date(dashboard.goal.deadline) -
                        new Date()
                      ) /
                      (1000 * 60 * 60 * 24)
                    )
                  )
                }
                progress={dashboard.progress}
                successRate={
                  Math.min(
                    dashboard.progress + 15,
                    100
                  )
                }
              />

            </div>

          )}

        </div>

      </div>

    </MainLayout>
  );
}