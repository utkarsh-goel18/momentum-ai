import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {

  const navigate = useNavigate();
  const { user } = useAuth();

  const [unreadCount, setUnreadCount] =
    useState(0);

  useEffect(() => {

    if (user) {
      fetchUnreadCount();
    }

  }, [user]);

  const fetchUnreadCount = async () => {

    try {

      const response = await fetch(
        `http://127.0.0.1:5000/notifications/${user.uid}/unread-count`
      );

      const data = await response.json();

      setUnreadCount(data.count);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <div
      className="
        h-[90px]
        border-b
        border-[#1E293B]
        flex
        items-center
        justify-between
        px-10
      "
    >

      <div className="flex items-center gap-8 justify-end w-full">

        <button
          onClick={() =>
            navigate("/notifications")
          }
          className="
            relative
            text-2xl
            hover:scale-110
            transition
          "
        >

          🔔

          {unreadCount > 0 && (

            <span
              className="
                absolute
                -top-2
                -right-2
                bg-red-500
                text-white
                text-xs
                rounded-full
                h-5
                w-5
                flex
                items-center
                justify-center
              "
            >
              {unreadCount}
            </span>

          )}

        </button>

        <button
          onClick={() =>
            navigate("/goal/new")
          }
          className="
            px-8
            py-4
            rounded-full
            font-semibold
            bg-gradient-to-r
            from-purple-500
            to-blue-500
            hover:scale-105
            transition
          "
        >
          + New Goal
        </button>

      </div>

    </div>

  );

}