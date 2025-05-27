import React, { useState, useEffect } from "react";
import { navs as initialNavs } from "@/data/data";
import { FaHouseChimney } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      let foundActive = false;
      initialNavs.forEach((nav) => {
        const section = document.getElementById(nav.target);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < 300) {
            setActiveNav(nav.name);
            foundActive = true;
          }
        }
      });
      if (!foundActive) {
        setActiveNav("Home"); // Default to Home if no section is active
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleMenu = () => {
    setOpen(!open);
    document.body.style.overflow = open ? "auto" : "hidden";
  };

  const handleScrollTo = (id, name) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveNav(name); // Set active menu item
      setOpen(false); // Close mobile menu
      document.body.style.overflow = "auto";
    }
  };

  return (
    <nav>
      <div className="container mx-auto flex justify-between items-center">
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {initialNavs.map((nav) => (
            <li key={nav.id}>
              <button
                className={`cursor-pointer text-md transition ${
                  activeNav === nav.name ? "text-yellow-400 font-bold" : "text-white"
                }`}
                onClick={() => handleScrollTo(nav.target, nav.name)}
              >
                {nav.name === "Home" ? <FaHouseChimney className="inline-block mr-1" /> : nav.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={handleToggleMenu} className="md:hidden text-2xl">
          {open ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-90 transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50 md:hidden`}
      >
        <div className="w-64 bg-white h-full p-6">
          {/* Close Button */}
          <button onClick={handleToggleMenu} className="text-black text-2xl mb-4">
            <IoClose />
          </button>

          {/* Mobile Nav Links */}
          <ul className="space-y-4">
            {initialNavs.map((nav) => (
              <li key={nav.id}>
                <button
                  className={`cursor-pointer text-lg block w-full text-left py-2 px-4 ${
                    activeNav === nav.name ? "text-yellow-400 font-bold" : "text-black"
                  }`}
                  onClick={() => handleScrollTo(nav.target, nav.name)}
                >
                  {nav.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
