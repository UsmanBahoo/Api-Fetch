import React, { useState } from "react";
import axios from "axios";

function App() {
  const [username, setUsername] = useState(""); // input ke liye
  const [data, setData] = useState(null);       // API response ke liye

  const fetchData = async () => {
    if (!username) return; // agar khali input hai to kuch na karo
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      setData(res.data); // user ka data save
    } catch {
      setData({ error: "User not found" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">GitHub API Viewer</h2>

      <div className="flex gap-2 w-full max-w-lg">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Fetch
        </button>
      </div>

      {data && (
        <pre className="mt-6 w-full max-w-2xl bg-white text-sm text-gray-800 p-4 rounded-lg shadow overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
