import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect, collections } from "@/db/dbConnect";
import { redirect } from "next/navigation";

export default async function AllUsersPage() {
  const session = await getServerSession(authOptions);

  /* ─────────────────────────────────────
     Admin Guard
  ───────────────────────────────────── */
  if (!session || session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  /* ─────────────────────────────────────
     Fetch Users
  ───────────────────────────────────── */
  const usersCollection = dbConnect(collections.USERS);

  const users = await usersCollection
    .find({}, { projection: { password: 0 } })
    .sort({ createdAt: -1 })
    .toArray();

  /* ─────────────────────────────────────
     UI
  ───────────────────────────────────── */
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Joined
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    {user.username || "—"}
                  </td>

                  <td className="px-4 py-3">
                    {user.email}
                  </td>

                  <td className="px-4 py-3 capitalize">
                    {user.role}
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="px-4 py-3">
                    {user.active !== false ? (
                      <span className="text-green-600 font-medium">
                        Active
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">
                        Disabled
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
