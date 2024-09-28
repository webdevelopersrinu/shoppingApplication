import React from "react";
import { assets } from "../assets/assets";
function Hero() {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* hero Left Side */}
      <div className="flex items-center justify-center w-fll sm:w-1/2 py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"> </p>
            <p className="font-medium text-sm md:text-base uppercase">
              our bestsellers{" "}
            </p>
          </div>
          <h1 className="capitalize text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="uppercase font-sm md:text-base font-semibold">
              shop now
            </p>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* hero Right Side */}
      <img src={assets.hero_img} alt="hero_img" className="w-full sm:w-1/2" />
    </div>
  );
}

export default Hero;
