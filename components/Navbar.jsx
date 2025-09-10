import React from "react";
import animatedIcon1 from "/public/locker.gif";
import animatedIcon2 from "/public/Github.gif";
import { MdLightMode } from "react-icons/md";

const Navbar = () => {
  const handleToggle = () => {
    console.log("Dark mode button clicked!");
  };

  return (
    <nav className="bg-teal-500 shadow-md px-6 py-3 flex justify-between items-center rounded-b-lg">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={animatedIcon1} alt="logo" className="w-10 h-10" />
        <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide">
          Tizori
        </span>
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-4">
        <MdLightMode
          size={28}
          className="text-white cursor-pointer hover:text-teal-300 transition"
          onClick={handleToggle}
        />
        <a
          href="https://github.com/AyushGour-crack-it/React-Password-Manager"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={animatedIcon2}
            alt="GitHub"
            className="w-10 h-10 hover:scale-110 transition"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
