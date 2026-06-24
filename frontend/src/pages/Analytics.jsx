import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";

import { useAuth } from "../context/AuthContext";

export default function Analytics() {

  const { user } = useAuth();

  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {

    if (user) {
      fetchAnalytics();
    }

  }, [user]);

  const fetchAnalytics = async () => {

    try {

      const response = await fetch(
        `http://127.0.0.1:5000/analytics/${user.uid}`
      );

      const data = await response.json();

      setAnalytics(data);

    } catch (error) {

      console.error(error);

    }

  };

  if (!analytics) {

    return (
      <MainLayout>
        <div className="p-10 text-2xl">
          Loading Analytics...
        </div>
      </MainLayout>
    );

  }

  return (

    <MainLayout>

      <div className="max-w-7xl mx-auto">

        <p className="uppercase tracking-[0.2em] text-purple-400 text-sm">
          PERFORMANCE ANALYTICS
        </p>

        <h1 className="text-7xl font-black mt-4">
          Analytics
        </h1>

        <p className="text-slate-400 text-xl mt-4">
          AI-powered mission performance overview.
        </p>

        {/* Stats */}

        <div className="grid grid-cols-4 gap-6 mt-10">

          <Card className="p-8">

            <p className="text-slate-400">
              Productivity Score
            </p>

            <h2 className="text-5xl font-bold text-green-400 mt-3">
              {analytics.productivity_score}%
            </h2>

          </Card>

          <Card className="p-8">

            <p className="text-slate-400">
              Completion Rate
            </p>

            <h2 className="text-5xl font-bold text-blue-400 mt-3">
              {analytics.completion_rate}%
            </h2>

          </Card>

          <Card className="p-8">

            <p className="text-slate-400">
              Active Missions
            </p>

            <h2 className="text-5xl font-bold text-orange-400 mt-3">
              {analytics.active_goals}
            </h2>

          </Card>

          <Card className="p-8">

            <p className="text-slate-400">
              Completed Missions
            </p>

            <h2 className="text-5xl font-bold text-purple-400 mt-3">
              {analytics.completed_goals}
            </h2>

          </Card>

        </div>

        {/* Mission Breakdown */}

        <div className="mt-12">

          <h2 className="text-4xl font-bold mb-6">
            Mission Breakdown
          </h2>

          <div className="space-y-5">

            {analytics.missions.map((mission) => (

              <Card
                key={mission.id}
                className="p-6"
              >

                <div className="flex justify-between">

                  <h3 className="text-xl font-semibold">
                    {mission.title}
                  </h3>

                  <span className="text-green-400 font-bold">
                    {mission.progress}%
                  </span>

                </div>

                <div className="mt-4 h-4 bg-slate-800 rounded-full">

                  <div
                    className="
                      h-4
                      rounded-full
                      bg-gradient-to-r
                      from-purple-500
                      to-blue-500
                    "
                    style={{
                      width: `${mission.progress}%`
                    }}
                  />

                </div>

              </Card>

            ))}

          </div>

        </div>

      </div>

    </MainLayout>

  );

}