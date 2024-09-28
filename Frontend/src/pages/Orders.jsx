import React, { useContext, useEffect, useState } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import axios from "axios";

function Orders() {
  const { currency, backendUrl, token } = useContext(shopContext);
  const [orderData, setOrderData] = useState([]);
  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      } else {
        const response = await axios.post(
          backendUrl + "/api/v1/order/userorders",
          {},
          { headers: { Authorization: "Bearer " + token } }
        );
        if (response.data.orders) {
          let allOrdersItem = [];
          response.data.orders.map((order) => {
            order.items.map((item) => {
              item["status"] = order.status;
              item["payment"] = order.payment;
              item["paymentMethod"] = order.paymentMethod;
              item["date"] = order.date;
              allOrdersItem.push(item);
            });
          });
          setOrderData(allOrdersItem.reverse());

        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadOrderData();
  }, []);
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData?.map((item, index) => {
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img src={item.image[0]} className="w-16 sm:w-20 " />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-1">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                  paymentMethod:{" "}
                    <span className="text-gray-400">
                      {item.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                  <p>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-sm">
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Orders;
