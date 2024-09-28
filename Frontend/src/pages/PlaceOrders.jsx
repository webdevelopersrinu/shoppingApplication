import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CardTotal from "../components/CardTotal";
import { assets } from "../assets/assets";
import { shopContext } from "../context/ShopContext";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrders() {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCardAmount,
    delivery_fee,
    products,
  } = useContext(shopContext);
  // form data handele with formik
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
      phone: "",
    },
    onSubmit: async (values) => {
      // console.log(values);
      try {
        const orderItems = [];
        for (const items in cartItems) {
          for (const item in cartItems[items]) {
            if (cartItems[items][item] > 0) {
              const itemInfo = structuredClone(
                products.find((product) => product._id === items)
              );
              if (itemInfo) {
                itemInfo.size = item;
                itemInfo.quantity = cartItems[items][item];
                orderItems.push(itemInfo);
              }
            }
          }
        }

        const orderData = {
          address: values,
          items: orderItems,
          amount: getCardAmount() + delivery_fee,
        };
        const response = await axios.post(
          backendUrl + "/api/v1/order/palce",
          orderData,
          { headers: { Authorization: "Bearer " + token } }
        );
        if (response.data.message) {
          console.log(response.data.message);
          toast.success(response.data.message);
          setCartItems({});
          navigate("/orders");
        } else {
          toast.error(response.message);
        }

        // switch (method) {
        //   case "cod":
        //     const response = await axios.post(
        //       backendUrl + "/api/v1/order/palce",
        //       orderData,
        //       { headers: { Authorization: "Bearer " + token } }
        //     );
        //     if (response.data.message) {
        //       console.log(response.data.message);
        //       toast.success(response.data.message);
        //       setCartItems({});
        //       navigate("/orders");
        //     } else {
        //       toast.error(response.message);
        //     }
        //     break;
        //   case "stripe":
        //     const responesStripe = await axios.post(
        //       backendUrl + "/api/v1/order/stripe",
        //       orderData,
        //       { headers: { Authorization: "Bearer " + token } }
        //     );

        //     if (responesStripe?.data?.session_url) {
        //       const { session_url } = responesStripe.data;
        //       window.location.replace(session_url);
        //     } else {
        //       toast.error(responesStripe.data.message);
        //     }
        //     break;
        // }
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"
    >
      {/* ---------------Left side-------------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          type="email"
          placeholder="Email address"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          type="text"
          placeholder="Street"
          name="street"
          value={formik.values.street}
          onChange={formik.handleChange}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            required
            type="text"
            placeholder="City"
            value={formik.values.city}
            onChange={formik.handleChange}
            name="city"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            type="text"
            placeholder="State"
            value={formik.values.state}
            onChange={formik.handleChange}
            name="state"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            type="text"
            placeholder="Zipcode"
            value={formik.values.zipcode}
            onChange={formik.handleChange}
            name="zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            type="text"
            placeholder="Country"
            value={formik.values.country}
            onChange={formik.handleChange}
            name="country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          type="number"
          placeholder="Phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          name="phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/* -----------Right Side -------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CardTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* ------------- payment Method secetion -------------- */}
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                src={assets.stripe_logo}
                alt="stripe_logo"
                className="h-5 mx-4"
              />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                src={assets.razorpay_logo}
                alt="stripe_logo"
                className="h-5 mx-4"
              />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4 ">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8 ">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrders;
