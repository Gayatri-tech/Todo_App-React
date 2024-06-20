import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-pink-600 text-white h-14 items-center">
      <div className="logo cursor-pointer">
        <span className="font-bold text-xl mx-6">Todos</span>
      </div>
      <ul className="flex gap-6 mx-6 items-center">
        <li className="cursor-pointer hover:underline">Home</li>
        <li className="cursor-pointer hover:underline">Your Tasks</li>
      </ul>
    </nav>
  );
};

export default Navbar;
