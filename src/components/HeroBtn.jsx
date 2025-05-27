import React from "react";

const HeroBtn = ({ name, target }) => {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={() => handleScrollTo(target)}
      className={`px-4 py-2 border border-[#cda45e] text-white text-sm font-regular rounded-full shadow-md hover:bg-[#cda45e] transition-all duration-300 uppercase scrollto ${
        name.toLowerCase().includes("book") ? "ms-4" : ""
      }`}
    >
      {name}
    </button>
  );
};

export default HeroBtn;
