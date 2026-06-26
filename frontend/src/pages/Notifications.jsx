import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import Card from "../components/Card";

import { useAuth } from "../context/AuthContext";
import { API_URL } from "../config";

export default function Notifications() {

  const { user } = useAuth();

  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {

    if (user) {
      fetchNotifications();
    }

  }, [user]);

  const fetchNotifications = async () => {

    const response = await fetch(
        `${API_URL}/notifications/${user.uid}`
    );

    const data = await response.json();

    setNotifications(data);

    await fetch(
        `${API_URL}/notifications/${user.uid}/read-all`,
        {
        method: "PUT"
        }
    );

    };

  return (
    <MainLayout>

      <div className="max-w-6xl mx-auto">

        <h1 className="text-6xl font-black mb-10">
          Notifications
        </h1>

        <div className="space-y-4">

          {notifications.length === 0 ? (

            <Card className="p-6">
              No notifications yet.
            </Card>

          ) : (

            notifications.map((notification) => (

              <Card
                key={notification.id}
                className={`
                  p-6
                  cursor-pointer
                  transition

                  ${
                    !notification.is_read
                      ? "border-purple-500"
                      : ""
                  }
                `}
              >

                <p className="text-lg">
                  {notification.message}
                </p>

                <p className="text-slate-400 mt-2 text-sm">
                  {notification.created_at}
                </p>

              </Card>

            ))

          )}

        </div>

      </div>

    </MainLayout>
  );
}