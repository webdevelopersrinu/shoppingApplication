import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

function IteamList({ token }) {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/v1/producte/list");

      if (response?.data?.products) {
        setList(response.data.products);
        console.log(response.data)
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  const removeProduct = async (id) => {
    console.log(id)
    try {
      const response = await toast.promise(
        axios.post(
          backendUrl + "/api/v1/producte/remove",
          { id },
          { headers: { Authorization: "Bearer " + token } }
        ),
        {
          pending: "Submitting your data...",
          success: "remove product successfully!",
          error: "Failed to submit data. Please try again.",
        }
      );
      if (response.data) {
        await fetchList();
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err.response.data.message);
    }
  };
  return (
    <>
      <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
        <p className="mb-2">All Products List</p>
        <div className="flex flex-col gap-2">
          {/* --------------- LIst Table Title------------------- */}
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b className="text-center">Action</b>
          </div>
          {/* ------------ Product List----------------- */}
          {list.map((item) => {
            const { _id, image, name, category, price } = item;
            return (
              <div
                key={_id}
                className="grid grid-cols-[1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
              >
                <img className="w-12" src={image[0]} alt={name} />
                <p>{name}</p>
                <p>{category}</p>
                <p>
                  {currency} {price}
                </p>
                <p
                  className="text-right md:text-center cursor-pointer text-xl"
                  onClick={() => removeProduct(_id)}
                >
                  x
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default IteamList;
