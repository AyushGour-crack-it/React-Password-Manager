import React from 'react';
import { Mail, Linkedin } from "lucide-react"; 

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-teal-100 to-teal-200 border-t border-teal-300 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        
        {/* Left Side */}
        <p className="text-sm text-gray-700 text-center sm:text-left">
          © {new Date().getFullYear()} Made with ❤️ by{" "}
          <span className="font-semibold text-teal-700">Ayush Gour</span>
        </p>

        {/* Right Side Links */}
        <div className="flex gap-5 items-center">
          {/* Email */}
          <a
            href="mailto:ayushgour2526@gmail.com?subject=Hello%20Ayush&body=I%20wanted%20to%20connect%20with%20you."
            className="flex items-center gap-2 text-gray-700 hover:text-teal-900 transition"
          >
            <Mail className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">Email</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/ayush-gour-7654a1278/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-700 hover:text-coral-600 transition"
          >
            <Linkedin className="w-5 h-5" />
            <span className="hidden sm:inline text-sm">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
