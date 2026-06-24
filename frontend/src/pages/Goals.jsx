import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import MainLayout from "../layouts/MainLayout";
import GoalCard from "../components/GoalCard";

export default function Goals() {
  const [goals, setGoals] = useState([]);

  const activeGoals =
    goals.filter(
      goal => goal.status !== "completed"
    );

  const completedGoals =
    goals.filter(
      goal => goal.status === "completed"
    );

  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user]);

  const fetchGoals = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/user-goals/${user.uid}`
      );

      const data = await response.json();

      setGoals(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <div className="mb-10">

        <p className="text-purple-400 uppercase tracking-widest text-sm">
          Mission Control
        </p>

        <h1 className="text-6xl font-black mt-2">
          Mission Control
        </h1>

        <p className="text-slate-400 text-xl mt-3">
          AI is tracking success probability across all missions.
        </p>

      </div>

      {loading ? (
        <div className="text-slate-400 text-xl">
          Loading missions...
        </div>
      ) : goals.length === 0 ? (
        <div
          className="
          bg-[#0B1220]
          border
          border-[#1E293B]
          rounded-3xl
          p-12
          text-center
        "
        >
          <h2 className="text-3xl font-bold mb-3">
            No Missions Found
          </h2>

          <p className="text-slate-400">
            Create your first goal to begin.
          </p>
        </div>
      ) : (
        <div>

  {/* Active Missions */}

  <h2 className="text-3xl font-bold mb-6">
    🚀 Active Missions
  </h2>

  <div className="grid grid-cols-2 gap-8">

    {activeGoals.map((goal) => {

      const deadline = new Date(
        goal.deadline + "T23:59:59"
      );

      const daysLeft = Math.max(
        0,
        Math.ceil(
          (deadline - new Date()) /
          (1000 * 60 * 60 * 24)
        )
      );

      return (

        <Link
          key={goal.id}
          to={`/goal/${goal.id}`}
        >

          <GoalCard
            title={goal.title}
            daysLeft={daysLeft}
            progress={goal.progress}
            successRate={goal.progress}
            status={goal.status}
          />

        </Link>

      );

    })}

  </div>

    {/* Completed Missions */}

    {completedGoals.length > 0 && (

      <>

        <h2 className="text-3xl font-bold mt-14 mb-6">
          🎉 Completed Missions
        </h2>

        <div className="grid grid-cols-2 gap-8">

          {completedGoals.map((goal) => (

            <Link
              key={goal.id}
              to={`/goal/${goal.id}`}
            >

              <GoalCard
                title={goal.title}
                daysLeft={0}
                progress={100}
                successRate={100}
                status={goal.status}
              />

            </Link>

          ))}

        </div>

      </>

    )}

  </div>
      )}

    </MainLayout>
  );
}