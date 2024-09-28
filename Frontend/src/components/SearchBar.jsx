import React, { useContext, useEffect } from "react";
import { shopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(shopContext);
  const location = useLocation();

  return showSearch && location.pathname === "/collection" ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-5 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img className="w-4" src={assets.search_icon} alt="search_icon" />
      </div>
      <img
        src={assets.cross_icon}
        alt="cross_icon"
        className="inline w-3 cursor-pointer"
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
}

export default SearchBar;
