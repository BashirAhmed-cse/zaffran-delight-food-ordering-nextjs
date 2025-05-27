import React from 'react';


const AppBtn = ({name}) => {
    const handleScrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };
  return (
    <button
    className="hidden lg:flex px-4 py-2 border border-[#cda45e] text-white text-sm font-regular rounded-full shadow-md hover:bg-[#cda45e] transition-all duration-300 uppercase"
    onClick={() => handleScrollTo("book-a-table")}
  >
    {name}
  </button>
  )
}

export default AppBtn
