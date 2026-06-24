import { useNavigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";

import { useAuth } from "../context/AuthContext";

export default function Settings() {

  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = async () => {

    try {

      await logout();

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert("Failed to logout");

    }

  };

  return (

    <MainLayout>

      <div className="max-w-5xl mx-auto">

        <p className="uppercase tracking-[0.2em] text-purple-400 text-sm">
          ACCOUNT SETTINGS
        </p>

        <h1 className="text-7xl font-black mt-4">
          Settings
        </h1>

        <div className="space-y-6 mt-10">

          {/* Profile */}

          <Card className="p-8">

            <h2 className="text-2xl font-bold mb-6">
              Profile
            </h2>

            <div className="space-y-4">

              <div>

                <p className="text-slate-400">
                  Name
                </p>

                <p className="text-xl font-semibold mt-1">
                  {user?.displayName || "User"}
                </p>

              </div>

              <div>

                <p className="text-slate-400">
                  Email
                </p>

                <p className="text-xl font-semibold mt-1">
                  {user?.email}
                </p>

              </div>

            </div>

          </Card>

          {/* Notifications */}

          <Card
            className="
              p-8
              cursor-pointer
              hover:border-purple-500
              hover:scale-[1.01]
              transition
            "
            onClick={() => navigate("/notifications")}
          >

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-2xl font-bold">
                  Notifications
                </h2>

                <p className="text-slate-400 mt-2">
                  View all notifications and mission updates.
                </p>

              </div>

              <span className="text-3xl">
                →
              </span>

            </div>

          </Card>

          {/* Logout */}

          <Card className="p-8">

            <h2 className="text-2xl font-bold mb-6">
              Account
            </h2>

            <button
              onClick={handleLogout}
              className="
                px-8
                py-4
                rounded-2xl
                bg-red-500
                hover:bg-red-600
                transition
                font-bold
              "
            >
              Sign Out
            </button>

          </Card>

        </div>

      </div>

    </MainLayout>

  );

}