import React from "react";
import { assets } from "../assets/assets";

function OurPolicy() {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img
          src={assets.exchange_icon}
          alt="exchange_icon"
          className="w-12 m-auto mb-5"
        />
        <p className="capitalize font-semibold">easy exchange policy</p>
        <p className="text-gray-400">we offer hassle free exchange policy</p>
      </div>
      <div>
        <img
          src={assets.quality_icon}
          alt="quality_icon"
          className="w-12 m-auto mb-5"
        />
        <p className="capitalize font-semibold">7 Days Return policy</p>
        <p className="text-gray-400">we provid 7 days free return policy</p>
      </div>
      <div>
        <img
          src={assets.support_img}
          alt="support_img"
          className="w-12 m-auto mb-5"
        />
        <p className="capitalize font-semibold">best customer support</p>
        <p className="text-gray-400">we provide 24/7 customer suppport</p>
      </div>
    </div>
  );
}

export default OurPolicy;
