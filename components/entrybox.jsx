import { useState } from "react";
import toast from "react-hot-toast";

const LeftBox = ({ addEntry }) => {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passShow, setPassShow] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!website.trim() || !username.trim() || !password.trim()) {
      toast.error("Please fill out all fields!");
      return;
    }
    const newEntry = {
      id: Date.now(),
      website,
      username,
      password,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      updatedAt: null,
    };
    addEntry(newEntry);
    setWebsite("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
      <form onSubmit={handleAdd} className="flex flex-col gap-4" id="Ayush">
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
        />
        <div className="relative">
          <input
            type={passShow ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
          />
          <img
            src={passShow ? "eye.png" : "eyecross.png"}
            alt="toggle"
            onClick={() => setPassShow(!passShow)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
          />
        </div>
        <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg py-2 shadow transition cursor-pointer">
          ➕ Add Credentials
        </button>
      </form>
    </div>
  );
};

export default LeftBox;
