'use client';
import UserTabs from "@/components/layout/UserTabs";
import { useProfile } from "@/components/UseProfile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { loading, data } = useProfile();

  useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(users => setUsers(users));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!data?.admin) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        You are not authorized to view this page.
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto mt-10 px-4 text-white">
      <UserTabs isAdmin={true} />

      <h1 className="text-2xl font-semibold mb-4 mt-8">Manage Users</h1>

      <div className="space-y-3">
        {users?.length > 0 ? users.map(user => (
          <div
            key={user._id}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 flex justify-between items-center hover:bg-gray-700 transition">
            <div>
              <div className="font-medium text-lg">
                {user.name || <span className="italic text-gray-400">No name</span>}
              </div>
              <div className="text-sm text-gray-400">{user.email}</div>
            </div>
            <Link
              href={`/users/${user._id}`}
              className="text-sm bg-primary hover:bg-primary-dark px-4 py-1 rounded text-white"
            >
              Edit
            </Link>
          </div>
        )) : (
          <div className="text-gray-400 italic">No users found.</div>
        )}
      </div>
    </section>
  );
}
