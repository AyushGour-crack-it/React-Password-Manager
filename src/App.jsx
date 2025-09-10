import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "../components/Navbar";
import LeftBox from "../components/entrybox";
import EachData from "../components/EachData";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
  const eachEntries = "eachEntries";
  const [entries, setEntries] = useState(() => {
    const rawEntry = localStorage.getItem(eachEntries);
    return rawEntry ? JSON.parse(rawEntry) : [];
  });

  useEffect(() => {
    localStorage.setItem(eachEntries, JSON.stringify(entries));
  }, [entries]);

  const addEntry = (newEntry) => {
    setEntries((prev) => [...prev, newEntry]);
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((t) => t.id !== id));
  };

  const updateEntry = (id, updatedData) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === id
        ? {
          ...entry,
          ...updatedData,
          updatedAt: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        }
        : entry
    );
    setEntries(updatedEntries);
  };

  return (
    <div className="BiggestContainer font-sans bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <div className="leftBox w-[90%] sm:w-4/5 md:w-2/3 lg:w-1/2 mx-auto mt-5">
        <LeftBox addEntry={addEntry} />
      </div>
<div className="AllData mx-4 m-5 p-6 rounded-2xl border border-teal-200 
  bg-gradient-to-br from-teal-50 to-white shadow-md 
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
  {entries.length === 0 ? (
    <p className="text-gray-500 text-center">No credentials saved yet.</p>
  ) : (
    entries.map((entry) => (
      <EachData
        key={entry.id}
        {...entry}
        onDelete={handleDelete}
        onUpdate={updateEntry}
      />
    ))
  )}
</div>






      <div className="mt-auto">
        <Footer />
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default App;
