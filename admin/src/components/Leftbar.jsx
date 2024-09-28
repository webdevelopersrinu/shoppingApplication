import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

function Leftbar() {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink to={"/add"} className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-xl `}>
          <img src={assets.add_icon} alt="add_icon" className="w-6 h-6"/>
          <p className="hidden md:block">Add items</p>
        </NavLink>
        <NavLink to={"/list"} className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-xl `}>
          <img src={assets.order_icon} alt="add_icon" className="w-6 h-6"/>
          <p className="hidden md:block">List items</p>
        </NavLink>
        <NavLink to={"/orders"} className={`flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l-xl `}>
          <img src={assets.order_icon} alt="add_icon" className="w-6 h-6"/>
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Leftbar;
