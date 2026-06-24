import { NavLink } from "react-router-dom";

import {
LayoutDashboard,
Target,
Calendar,
BarChart3,
Bot,
Settings,
LogOut,
} from "lucide-react";

import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

const links = [
{
name: "Dashboard",
path: "/dashboard",
icon: LayoutDashboard,
},
{
name: "Goals",
path: "/goals",
icon: Target,
},
{
name: "Daily Planner",
path: "/planner",
icon: Calendar,
},
{
name: "Analytics",
path: "/analytics",
icon: BarChart3,
},
{
name: "AI Coach",
path: "/coach",
icon: Bot,
},
];

export default function Sidebar() {
const { user } = useAuth();

const handleLogout = async () => {
try {
await signOut(auth);
window.location.href = "/login";
} catch (error) {
console.error(error);
}
};

return (
<aside className=" w-[280px] min-h-screen bg-[#0B1220] border-r border-[#1E293B] flex flex-col justify-between " >
{/* TOP */}

  <div>
    {/* LOGO */}

    <div className="px-6 py-8 flex items-center gap-4">
      <div className="relative">
        <div
          className="
            absolute
            inset-0
            bg-purple-500
            blur-2xl
            opacity-40
          "
        />

        <div
          className="
            relative
            h-14
            w-14
            rounded-2xl
            bg-gradient-to-br
            from-purple-500
            to-blue-500
            flex
            items-center
            justify-center
            text-xl
            font-bold
          "
        >
          ⚡
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-white">
          Momentum
        </h1>

        <p className="text-xs text-slate-400">
          AI Mission Control
        </p>
      </div>
    </div>

    {/* NAVIGATION */}

    <nav className="mt-8 px-4">
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-4
              px-5
              py-4
              rounded-2xl
              mb-3
              transition-all
              duration-300

              ${
                isActive
                  ? `
                    bg-purple-500/20
                    text-purple-300
                    border
                    border-purple-500/30
                  `
                  : `
                    text-slate-400
                    hover:bg-slate-800
                    hover:text-white
                  `
              }
              `
            }
          >
            <Icon size={20} />

            <span className="font-medium">
              {link.name}
            </span>
          </NavLink>
        );
      })}
    </nav>
  </div>

  {/* BOTTOM */}

  <div className="p-5 border-t border-[#1E293B]">
    {/* SETTINGS */}

    <NavLink
      to="/settings"
      className="
        flex
        items-center
        gap-3
        text-slate-400
        hover:text-white
        transition
        mb-4
      "
    >
      <Settings size={18} />
      <span>Settings</span>
    </NavLink>

    {/* USER CARD */}

    <div
      className="
        p-4
        rounded-2xl
        bg-[#111827]
        border
        border-[#1E293B]
      "
    >
      <div className="flex items-center gap-3">
        <img
          src={
            user?.photoURL ||
            "https://ui-avatars.com/api/?name=User"
          }
          alt="profile"
          className="
            h-14
            w-14
            rounded-full
            border-2
            border-purple-500
          "
        />

        <div className="overflow-hidden">
          <h3 className="font-semibold text-white truncate">
            {user?.displayName || "User"}
          </h3>

          <p className="text-xs text-slate-400 truncate">
            {user?.email || "Free Plan"}
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="
          mt-4
          w-full
          py-2.5

          rounded-xl

          bg-red-500/10
          border
          border-red-500/20

          text-red-400

          hover:bg-red-500/20

          transition

          flex
          items-center
          justify-center
          gap-2
        "
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  </div>
</aside>

);
}