import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";

import { useAuth } from "../context/AuthContext";

export default function DailyPlanner() {

  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);

  useEffect(() => {

    if (user) {
      fetchTasks();
    }

  }, [user]);

  const fetchTasks = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        `http://127.0.0.1:5000/planner/user/${user.uid}`
      );

      const data = await response.json();

      setTasks(data.tasks || []);

      const streakResponse = await fetch(
        `http://127.0.0.1:5000/streak/${user.uid}`
      );

      const streakData = await streakResponse.json();

      setStreak(
        streakData.current_streak || 0
      );      

    } catch (error) {

      console.error(error);

      setTasks([]);

    } finally {

      setLoading(false);

    }

  };

  const toggleTask = async (taskId) => {

    try {

      await fetch(
        `http://127.0.0.1:5000/tasks/${taskId}/toggle`,
        {
          method: "PUT"
        }
      );

      fetchTasks();

    } catch (error) {

      console.error(error);

    }

  };

  const completedTasks = tasks.filter(
    task => task.completed
  ).length;

  const totalTasks = tasks.length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  if (loading) {
    return (
      <MainLayout>
        <div className="p-10 text-2xl">
          Loading Planner...
        </div>
      </MainLayout>
    );
  }

  return (

    <MainLayout>

      <div className="max-w-6xl mx-auto">

        <h1 className="text-6xl font-black mb-10">
          Daily Planner
        </h1>

        {/* Progress Card */}

        <Card className="p-8 mb-8">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-400">
                Today's Progress
              </p>

              <h2 className="text-5xl font-bold mt-2">
                {progress}%
              </h2>

              <p className="text-orange-400 mt-3 font-semibold">
                🔥 {streak} Day Streak
              </p>

              <p className="text-slate-400 mt-2">
                {completedTasks} / {totalTasks} tasks completed
              </p>

            </div>

            <div className="text-7xl">
              🎯
            </div>

          </div>

          <div className="mt-6 h-4 bg-slate-800 rounded-full">

            <div
              className="
                h-4
                rounded-full
                bg-gradient-to-r
                from-purple-500
                to-blue-500
                transition-all
                duration-500
              "
              style={{
                width: `${progress}%`
              }}
            />

          </div>

        </Card>

        {/* Empty State */}

        {tasks.length === 0 ? (

          <Card className="p-10 text-center">

            <h2 className="text-3xl font-bold">
              No Tasks Found
            </h2>

            <p className="text-slate-400 mt-3">
              Create a mission and generate a roadmap first.
            </p>

          </Card>

        ) : (

          <div className="space-y-4">

            {tasks.map((task) => (

              <Card
                key={task.id}
                className={`
                  p-6
                  flex
                  justify-between
                  items-center
                  transition-all

                  ${
                    task.completed
                      ? "border border-green-500/30"
                      : ""
                  }
                `}
              >

                <div>

                  <h3
                    className={`
                      text-xl

                      ${
                        task.completed
                          ? "line-through text-slate-500"
                          : "text-white"
                      }
                    `}
                  >
                    {task.title}
                  </h3>

                </div>

                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    toggleTask(task.id)
                  }
                  className="
                    h-6
                    w-6
                    accent-purple-500
                    cursor-pointer
                  "
                />

              </Card>

            ))}

          </div>

        )}

        {/* Completion Card */}

        {progress === 100 && totalTasks > 0 && (

          <Card
            className="
              mt-8
              p-8
              border
              border-green-500/40
            "
          >

            <h2 className="text-4xl font-bold text-green-400">
              🎉 All Tasks Completed
            </h2>

            <p className="text-slate-400 mt-2">
              Excellent work. Your mission is ready for completion.
            </p>

          </Card>

        )}

      </div>

    </MainLayout>

  );

}