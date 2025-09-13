import { useState, useEffect ,useRef } from "react";
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
  // using useRef to focus input field when + icon is clicked when there is no data
  const inputRef = useRef(null); //passing this prop to enterybox.jsx
  const focusInput = ()=>{
    console.log("clicked");
    inputRef.current.focus();
  }
  return (
    <div className="BiggestContainer font-sans bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

       <div className="leftBox w-[90%] sm:w-4/5 md:w-2/3 lg:w-1/2 mx-auto mt-5">
        <LeftBox addEntry={addEntry} inputRef={inputRef} />
      </div>
              <div className="AllData mx-4 m-5 p-6 rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                  {entries.length === 0 ? 
                   (
                     <div className="col-span-full flex flex-col items-center justify-center text-center p-10 border-2 border-dashed border-teal-300 rounded-xl bg-white shadow-sm">
                          < svg xmlns="http://www.w3.org/2000/svg" onClick={focusInput} className=" h-12 w-12 text-teal-400 mb-3"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <p className="text-gray-700 text-lg font-medium"> No credentials saved yet </p>
                              <p className="text-gray-500 text-sm mt-1">
                                Start by adding your first entry!
                              </p>
                    </div>
                   ) :
                   
                   (
                     entries.map((entry) => (
                     <EachData key={entry.id} {...entry} onDelete={handleDelete} onUpdate={updateEntry}/>
                    ))
                   )
                  }
    </div>
      <div className="mt-auto">
        <Footer />
      </div>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}

export default App;
