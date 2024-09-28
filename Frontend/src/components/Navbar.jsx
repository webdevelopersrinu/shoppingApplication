import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { shopContext } from "../context/ShopContext";
function Navbar() {
  const [visible, setVisible] = useState(false);
  const {
    showSearch,
    setShowSearch,
    getCartCount,
    setCartItems,
    setToken,
    navigate,
    token,
  } = useContext(shopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };
  return (
    <div className=" flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <img src={assets.logo} className="w-16 sm:w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink to={"/"} className="flex flex-col items-center gap-1">
          <p className="uppercase">home</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink
          to={"/collection"}
          className="flex flex-col items-center gap-1"
        >
          <p className="uppercase">Collection</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700  hidden" />
        </NavLink>
        <NavLink to={"/about"} className="flex flex-col items-center gap-1">
          <p className="uppercase">about</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to={"/contact"} className="flex flex-col items-center gap-1">
          <p className="uppercase">contact</p>
          <hr className="w-3/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          onClick={() => setShowSearch(!showSearch)}
          alt="search_icon"
          className="w-5 cursor-pointer "
        />
        <div className="group relative">
          <img
            src={assets.profile_icon}
            alt="profile_icon"
            className="w-5 cursor-pointer"
            onClick={() => (token ? null : navigate("/login"))}
          />
          {/* dropdown menu */}
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded ">
                <p className="cursor-pointer hover:text-black capitalize">
                  my profile
                </p>
                <p onClick={()=>navigate("/orders")} className="cursor-pointer hover:text-black capitalize ">
                  orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black capitalize"
                >
                  logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to={"/card"} className="relative">
          <img
            src={assets.cart_icon}
            alt="cart_icon"
            className="min-w-5 w-5 "
          />
          <p className="absolute right-[-5px] bottom-[-7px] w-4 text-center leading-4 bg-black  text-white aspect-square rounded-full text-[9px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          alt="menu_icon"
          className="w-5 cursor-pointer sm:hidden"
        />
      </div>
      {/* Slidedar menu for small screens */}
      <div
        className={`absolute top-0 bottom-0 left-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600 cursor-pointer">
          <div
            className="flex items-center gap-4 p-3"
            onClick={() => setVisible(false)}
          >
            <img
              src={assets.dropdown_icon}
              alt="dropdown_icon"
              className="h-4 rotate-180"
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border uppercase"
            to="/"
          >
            home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border uppercase"
            to="/about"
          >
            about
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border uppercase"
            to="/contact"
          >
            contact
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border uppercase"
            to="/collection"
          >
            Collection
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
