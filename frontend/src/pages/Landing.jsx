import { Link } from "react-router-dom";

export default function Landing() {

  return (

    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">

      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full" />
      <div className="absolute top-40 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-8">

        {/* Navbar */}

        <div className="flex justify-between items-center py-8">

          <h1 className="text-3xl font-black">
            Momentum AI
          </h1>

          <div className="flex gap-4">

            <Link
              to="/login"
              className="
                px-6
                py-3
                rounded-xl
                border
                border-slate-700
                hover:border-purple-500
                transition
              "
            >
              Sign In
            </Link>

            <Link
              to="/login"
              className="
                px-6
                py-3
                rounded-xl
                bg-gradient-to-r
                from-purple-500
                to-blue-500
                font-semibold
                hover:scale-105
                transition
              "
            >
              Sign Up
            </Link>

          </div>

        </div>

        {/* Hero */}

        <div className="text-center py-32">

          <p className="uppercase tracking-[0.3em] text-purple-400">
            AI POWERED PRODUCTIVITY
          </p>

          <h1 className="text-8xl font-black mt-8 leading-tight">

            Turn Goals
            <br />

            Into Missions

          </h1>

          <p className="text-slate-400 text-2xl mt-8 max-w-3xl mx-auto">

            Create goals, generate AI roadmaps,
            build streaks, and track progress
            through your personal mission control center.

          </p>

          <div className="flex justify-center gap-6 mt-12">

            <Link
              to="/login"
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
              "
            >
              Launch Mission 🚀
            </Link>

            <Link
              to="/login"
              className="
                px-10
                py-5
                rounded-2xl
                border
                border-slate-700
                hover:border-purple-500
                transition
                font-bold
                text-lg
              "
            >
              Sign In
            </Link>

          </div>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-4 gap-6 py-20">

          <div className="bg-[#0F172A]/70 backdrop-blur-xl border border-[#1E293B] rounded-3xl p-8 text-center">
            <h3 className="text-5xl font-black text-purple-400">
              AI
            </h3>
            <p className="text-slate-400 mt-2">
              Goal Analysis
            </p>
          </div>

          <div className="bg-[#0F172A]/70 backdrop-blur-xl border border-[#1E293B] rounded-3xl p-8 text-center">
            <h3 className="text-5xl font-black text-blue-400">
              24/7
            </h3>
            <p className="text-slate-400 mt-2">
              Progress Tracking
            </p>
          </div>

          <div className="bg-[#0F172A]/70 backdrop-blur-xl border border-[#1E293B] rounded-3xl p-8 text-center">
            <h3 className="text-5xl font-black text-green-400">
              ∞
            </h3>
            <p className="text-slate-400 mt-2">
              Missions Supported
            </p>
          </div>

          <div className="bg-[#0F172A]/70 backdrop-blur-xl border border-[#1E293B] rounded-3xl p-8 text-center">
            <h3 className="text-5xl font-black text-orange-400">
              🔥
            </h3>
            <p className="text-slate-400 mt-2">
              Streak System
            </p>
          </div>

        </div>

        {/* Features */}

        <div className="py-24">

          <h2 className="text-6xl font-black text-center">
            Why Momentum AI?
          </h2>

          <p className="text-slate-400 text-xl text-center mt-4">
            Everything you need to turn ambitions into achievements.
          </p>

          <div className="grid grid-cols-3 gap-8 mt-16">

            <div className="bg-[#0F172A]/70 border border-[#1E293B] rounded-3xl p-8">
              <div className="text-5xl mb-4">🧠</div>

              <h3 className="text-2xl font-bold">
                AI Goal Analysis
              </h3>

              <p className="text-slate-400 mt-4">
                Instantly estimate difficulty,
                duration and success probability.
              </p>
            </div>

            <div className="bg-[#0F172A]/70 border border-[#1E293B] rounded-3xl p-8">
              <div className="text-5xl mb-4">🗺️</div>

              <h3 className="text-2xl font-bold">
                AI Roadmaps
              </h3>

              <p className="text-slate-400 mt-4">
                Automatically generate tasks and
                milestones tailored to your goal.
              </p>
            </div>

            <div className="bg-[#0F172A]/70 border border-[#1E293B] rounded-3xl p-8">
              <div className="text-5xl mb-4">📈</div>

              <h3 className="text-2xl font-bold">
                Analytics
              </h3>

              <p className="text-slate-400 mt-4">
                Track progress, completion rates
                and mission performance.
              </p>
            </div>

          </div>

        </div>

        {/* How It Works */}

        <div className="py-24">

          <h2 className="text-6xl font-black text-center">
            How It Works
          </h2>

          <div className="grid grid-cols-4 gap-8 mt-20">

            <div className="text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-purple-500 flex items-center justify-center text-3xl font-bold">
                1
              </div>

              <h3 className="text-2xl font-bold mt-6">
                Create Goal
              </h3>

              <p className="text-slate-400 mt-3">
                Define your mission.
              </p>

            </div>

            <div className="text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold">
                2
              </div>

              <h3 className="text-2xl font-bold mt-6">
                Analyze
              </h3>

              <p className="text-slate-400 mt-3">
                AI evaluates complexity.
              </p>

            </div>

            <div className="text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-green-500 flex items-center justify-center text-3xl font-bold">
                3
              </div>

              <h3 className="text-2xl font-bold mt-6">
                Execute
              </h3>

              <p className="text-slate-400 mt-3">
                Complete roadmap tasks.
              </p>

            </div>

            <div className="text-center">

              <div className="w-20 h-20 mx-auto rounded-full bg-orange-500 flex items-center justify-center text-3xl font-bold">
                4
              </div>

              <h3 className="text-2xl font-bold mt-6">
                Win
              </h3>

              <p className="text-slate-400 mt-3">
                Build streaks and finish missions.
              </p>

            </div>

          </div>

        </div>

        {/* CTA */}

        <div className="py-32 text-center">

          <h2 className="text-7xl font-black">
            Ready To Launch?
          </h2>

          <p className="text-slate-400 text-2xl mt-6">
            Let Momentum AI transform your goals
            into actionable missions.
          </p>

          <Link
            to="/login"
            className="
              inline-block
              mt-12
              px-12
              py-6
              rounded-3xl
              bg-gradient-to-r
              from-purple-500
              to-blue-500
              text-xl
              font-bold
              hover:scale-105
              transition
            "
          >
            Start Your First Mission 🚀
          </Link>

        </div>

      </div>

    </div>

  );

}