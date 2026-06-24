import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useAuth } from "../context/AuthContext";

export default function Login() {
const navigate = useNavigate();

const { user } = useAuth();

useEffect(() => {
if (user) {
navigate("/dashboard");
}
}, [user, navigate]);

const handleGoogleLogin = async () => {
try {
const result = await signInWithPopup(
auth,
googleProvider
);

  console.log(
    "Logged In:",
    result.user
  );

  navigate("/dashboard");

} catch (error) {
  console.error(error);
}

};

return (
<div className=" min-h-screen bg-[#020617] text-white relative overflow-hidden flex items-center justify-center " >

  <div
    className="
    absolute
    top-[-200px]
    left-[-200px]
    h-[500px]
    w-[500px]
    bg-purple-600/20
    blur-[180px]
    rounded-full
    "
  />

  <div
    className="
    absolute
    bottom-[-200px]
    right-[-200px]
    h-[500px]
    w-[500px]
    bg-blue-600/20
    blur-[180px]
    rounded-full
    "
  />

  <div
    className="
    w-[950px]
    max-w-[95%]
    bg-[#071024]/90
    border
    border-[#1E293B]
    rounded-[36px]
    overflow-hidden
    backdrop-blur-xl
    shadow-[0_0_60px_rgba(139,92,246,0.15)]
    grid
    grid-cols-2
    "
  >

    <div
      className="
      p-14
      flex
      flex-col
      justify-center
      "
    >

      <div
        className="
        h-20
        w-20
        rounded-3xl
        bg-gradient-to-br
        from-purple-500
        to-blue-500
        flex
        items-center
        justify-center
        text-4xl
        mb-8
        "
      >
        ⚡
      </div>

      <p
        className="
        text-purple-400
        uppercase
        tracking-[4px]
        text-sm
        mb-4
        "
      >
        AI Productivity OS
      </p>

      <h1
        className="
        text-6xl
        font-black
        leading-tight
        "
      >
        Momentum
      </h1>

      <p
        className="
        text-slate-400
        text-xl
        mt-6
        max-w-md
        "
      >
        Your AI-powered mission control system
        for goals, planning, productivity,
        and execution.
      </p>

    </div>

    <div
      className="
      border-l
      border-[#1E293B]
      flex
      items-center
      justify-center
      p-12
      "
    >

      <div className="w-full max-w-sm">

        <p
          className="
          text-purple-400
          uppercase
          tracking-[4px]
          text-sm
          mb-4
          "
        >
          Access Mission Control
        </p>

        <h2
          className="
          text-4xl
          font-black
          mb-4
          "
        >
          Sign In
        </h2>

        <p
          className="
          text-slate-400
          mb-10
          "
        >
          Continue with your Google account
          to access Momentum.
        </p>

        <button
          onClick={handleGoogleLogin}
          className="
          w-full
          py-4
          rounded-2xl
          bg-gradient-to-r
          from-purple-500
          to-blue-500
          font-semibold
          text-lg
          hover:scale-[1.03]
          transition-all
          duration-300
          shadow-[0_0_30px_rgba(139,92,246,0.35)]
          "
        >
          Continue with Google →
        </button>

      </div>

    </div>

  </div>

</div>

);
}