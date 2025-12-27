import { appTitle } from "../App";

export default function HomePage({ setPath }: { setPath: Function }) {
  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-xl w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Dashboard</h1>
        {/* Version */}
        <div className="text-gray-600 mb-4 text-sm text-center">{appTitle}</div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setPath("signin")}
            className="bg-blue-600 text-white py-4 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Sign In
          </button>

          <button
            onClick={() => setPath("signout")}
            className="bg-red-600 text-white py-4 rounded-xl shadow hover:bg-red-700 transition"
          >
            Sign Out
          </button>

          <button
            onClick={() => setPath("storein")}
            className="bg-green-600 text-white py-4 rounded-xl shadow hover:bg-green-700 transition"
          >
            Store In
          </button>

          <button
            onClick={() => setPath("storeout")}
            className="bg-purple-600 text-white py-4 rounded-xl shadow hover:bg-purple-700 transition"
          >
            Store Out
          </button>

          <button
            onClick={() => setPath("breakin")}
            className="bg-yellow-500 text-white py-4 rounded-xl shadow hover:bg-yellow-600 transition"
          >
            Break In
          </button>

          <button
            onClick={() => setPath("breakout")}
            className="bg-[#2FA334]  text-white py-4 rounded-xl shadow hover:bg-yellow-600 transition"
          >
            Break Out
          </button>
          <button
            onClick={() => setPath("users")}
            className="bg-gray-800 text-white py-4 rounded-xl shadow hover:bg-black transition"
          >
            Users
          </button>
        </div>
      </div>
    </div>
  );
}
