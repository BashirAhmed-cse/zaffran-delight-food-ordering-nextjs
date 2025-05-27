"use client"
import React, { useState, useEffect } from "react";
import { FaRegArrowAltCircleUp } from "react-icons/fa";

const BackToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={backToTop}
      className={`fixed bottom-5 right-5 p-2 rounded-full text-[#cda45e] transition-all duration-300 shadow-lg
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"}
      `}
    >
      <FaRegArrowAltCircleUp size={32} className="cursor-pointer"/>
    </button>
  );
};

export default BackToTopBtn;
