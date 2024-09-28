import React from "react";
import { useContext } from "react";
import { shopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
function ProdutItem({ id, image, name, price }) {
  const { currency } = useContext(shopContext);
  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden border rounded-md">
        <img
          src={image[0]}
          alt={name}
          className="hover:scale-110 transition ease-in-out duration-500 border rounded-md"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
}

export default ProdutItem;
