"use client";

import React, { useState, useEffect } from "react";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import "./topBar.css";

const TopBar = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="topbar"
      className={`flex items-center fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        scroll > 100 ? "bg-gray-800 opacity-90" : "bg-transparent opacity-100"
      }`}
    >
      <div className="w-full max-w-6xl mx-auto flex justify-center md:justify-between px-4 sm:px-6 lg:px-8 py-2">
        <div className="contact-info flex items-center space-x-4">
          <div className="flex items-center gap-1">
            <MdOutlinePhoneAndroid className="text-[#d9ba85]" />
            <span className=" text-white" aria-label="Phone Number">
            +1 210-888-1235
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FiClock className="text-[#d9ba85]" />
            <span className=" text-white" aria-label="Business Hours">
              Sun-Sat: 11AM - 10PM
            </span>
          </div>
        </div>
        <div className="language hidden md:flex items-center">
          <ul className="flex space-x-4">
            <li>EN</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
