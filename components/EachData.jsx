import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const EachData = ({ id, website, username, password, date, onDelete, onUpdate, updatedAt }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editWebsite, setEditWebsite] = useState(website);
  const [editUsername, setEditUsername] = useState(username);
  const [editPassword, setEditPassword] = useState(password);
  const [passShow, setPassShow] = useState(false);

  const handleUpdate = () => {
    if (isEditing) {
      if (!editWebsite.trim() || !editUsername.trim() || !editPassword.trim()) {
        toast.error("All fields are required!");
        return;
      }

      onUpdate(id, {
        website: editWebsite,
        username: editUsername,
        password: editPassword,
        updatedAt: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      });

      toast.success("Data Updated Successfully ✅");
    }
    setIsEditing(!isEditing);
  };

  const togglePassShow = () => setPassShow(!passShow);

  const copyContent = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard ✅"))
      .catch(() => toast.error("Failed to copy ❌"));
  };

  const handleDeleteClick = () => {
    toast((t) => (
      <div className="flex flex-col gap-2">
        <span>Are you sure you want to delete?</span>
        <div className="flex gap-2 justify-end flex-wrap">
          <button
            onClick={() => {
              onDelete(id);
              toast.dismiss(t.id);
              toast.success("Deleted Successfully ✅");
            }}
            className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 bg-gray-300 rounded-lg text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.5 }}
      className={`storedData w-full max-w-full flex flex-col p-4 sm:p-5 m-2
        bg-white gap-4 rounded-2xl border border-gray-200 shadow-md
        hover:shadow-lg transition-transform duration-200 ease-in-out`}
    >
      {/* Website */}
      {isEditing ? (
        <input
          type="text"
          value={editWebsite}
          onChange={(e) => setEditWebsite(e.target.value)}
          className="w-full text-center text-lg font-semibold text-teal-700 
            bg-gray-100 rounded-md border border-gray-300 px-2 py-1 
            focus:ring-2 focus:ring-teal-400 transition duration-300 ease-in-out outline-none"
        />
      ) : (
        <div className="text-center text-lg font-semibold text-teal-700 truncate w-full">
          {website}
        </div>
      )}

      {/* Username + Password + Date */}
      <div className="flex flex-col gap-2 bg-gray-50 rounded-xl p-3 shadow-sm w-full">
        {/* Username */}
        {isEditing ? (
          <input
            type="text"
            value={editUsername}
            onChange={(e) => setEditUsername(e.target.value)}
            className="w-full text-sm border border-gray-300 px-2 py-1 rounded-md 
              bg-gray-100 focus:ring-2 focus:ring-teal-400 transition duration-300 ease-in-out outline-none"
          />
        ) : (
          <div className="flex justify-between items-center bg-gray-100 text-sm 
            font-medium text-gray-700 rounded-md px-2 py-1 w-full truncate">
             <span className="truncate">{ "👤  " + username}</span>
            <img
              onClick={() => copyContent(username)}
              className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
              src="copy.png"
            />
          </div>
        )}

        {/* Password */}
        {isEditing ? (
          <input
            type={passShow ? "text" : "password"}
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
            className="w-full text-sm border border-gray-300 px-2 py-1 rounded-md 
              bg-gray-100 font-mono focus:ring-2 focus:ring-teal-400 transition duration-300 ease-in-out outline-none"
          />
        ) : (
          <div className="flex font-mono items-center gap-2 bg-gray-100 rounded-md px-2 py-1 w-full">
            <span className="text-sm text-gray-700 truncate flex-1">
              {passShow ? "🔑 " + password : "🔑 ••••••••"}
            </span>
            <img
              src={passShow ? "eye.png" : "eyecross.png"}
              alt="toggle"
              className="w-5 h-5 cursor-pointer opacity-70 hover:opacity-100"
              onClick={togglePassShow}
            />
            <img
              src="copy.png"
              className="w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
              onClick={() => copyContent(password)}
            />
          </div>
        )}

        {/* Date */}
        <div className="text-xs text-gray-400 truncate w-full">
          {updatedAt ? `Updated: ${updatedAt}` : `Added: ${date}`}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 sm:gap-3 justify-end flex-wrap">
        <motion.button
          onClick={handleUpdate}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="px-3 sm:px-4 py-1 sm:py-2 rounded-xl text-sm font-medium 
            bg-teal-500 text-white shadow cursor-pointer"
        >
          {isEditing ? "Save" : "Update"}
        </motion.button>
        <motion.button
          onClick={handleDeleteClick}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="px-3 sm:px-4 py-1 sm:py-2 rounded-xl text-sm font-medium 
            bg-red-500 text-white shadow cursor-pointer"
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
};

export default EachData;
