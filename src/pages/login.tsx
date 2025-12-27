import { useState } from "react";
import { setCred } from "../module/firebase";
import { appTitle } from "../App";

export default function HomePage({ setPath }: any) {
  const [password, setPassword] = useState("");
  const [busy, setbusy] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    if (busy) return;
    if (password.length < 3) {
      setError("Password must be at least 3 characters long");
      return;
    }

    setError("");

    setbusy(true);
    try {
      const res = await fetch("https://scanner-api-azure.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data) {
        const stringRes = JSON.stringify(data);
        sessionStorage.setItem("cred", stringRes);
        setCred(setPath);
      } else {
        setError("Invalid password");
      }
    } catch (err) {
      console.log(err);
      setError("Network error: Unable to login");
    }
    setbusy(false);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      {/* Version */}
      <div className="text-gray-600 mb-4 text-sm text-center">{appTitle}</div>
      <form
        onSubmit={handleLogin}
        className="backdrop-blur-lg bg-white/40 p-5 lg:p-8 rounded-2xl shadow-xl w-full max-w-sm border border-white/40 animate-fadeIn"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          autoFocus
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 rounded-lg mb-3 bg-white/70 backdrop-blur focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
        />

        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={busy}
          className={`w-full bg-blue-600 text-white py-3 rounded-lg transition shadow-md ${
            busy
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700 hover:shadow-lg"
          }`}
        >
          {busy ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
