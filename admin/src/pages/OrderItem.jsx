import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

function OrderItem({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/order/list",
        {},
        { headers: { Authorization: "Bearer " + token } }
      );
      setOrders(response.data.orders);
      console.log(response.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  // status handeler
  const statusHandeler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/order/status",
        { orderId, status: e.target.value },
        { headers: { Authorization: "Bearer " + token } }
      );
      if (response.data?.message) {
        await fetchAllOrders();
        toast.success(response.data?.message);
      }
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, [token]);
  return (
    <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
      <div>
        <h3>Order Page</h3>
        <div>
          {orders.map((order) => {
            return (
              <div
                key={order._id}
                className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
              >
                <img
                  className="w-12"
                  src={assets.parcel_icon}
                  alt="parcel_icon"
                />
                <div>
                  <div>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return (
                          <p key={item._id} className="py-0.5">
                            {item.name} x {item.quantity}{" "}
                            <span>{item.size}</span>
                          </p>
                        );
                      } else {
                        return (
                          <p key={index}>
                            {item.name} x {item.quantity}{" "}
                            <span>{item.size}</span> ,
                          </p>
                        );
                      }
                    })}
                  </div>
                  <p className="mt-3 mb-2 font-medium">
                    {order.address.firstName + " " + order.address.lastName}
                  </p>
                  <div>
                    <p>{order.address.state + ","}</p>
                    <p>
                      {order.address.city +
                        "," +
                        order.address.state +
                        "," +
                        order.address.country +
                        "," +
                        order.address.zipcode}
                    </p>
                  </div>
                  <p>{order.address.phone}</p>
                </div>
                <div>
                  <p className="text-sm sm:text-[15px]">
                    Items : {order.items.length}
                  </p>
                  <p className="mt-3">Method :{order.paymentMethod}</p>
                  <p>Payment : {order.payment ? "Done" : "Pending"}</p>
                  <p>Date :{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <p className="font-bold text-sm sm:text-[15px]">
                  {currency} {order.amount}
                </p>
                <select
                  value={order.status}
                  onChange={(e) => statusHandeler(e, order._id)}
                  className="p-2 font-semibold"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Packing">Packing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OrderItem;
