import { shopContext } from "../context/ShopContext";
import { useContext, useState, useEffect } from "react";
import Title from "./Title";
import ProdutItem from "./produtItem";
function BestSeller() {
  const { products } = useContext(shopContext);
  const [bestSeller, setBestSeller] = useState([]);
  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller);
    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid culpa
          in quaerat, velit corporis non distinctio
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item) => {
          const { _id, name, price, image } = item;
          return (
            <ProdutItem
              key={_id}
              id={_id}
              name={name}
              price={price}
              image={image}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BestSeller;
