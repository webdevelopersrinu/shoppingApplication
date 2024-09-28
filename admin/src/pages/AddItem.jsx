import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

function AddItem({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  async function submitHandeler(e) {
    e.preventDefault();

    if (sizes.length === 0) {
      toast.info("select producte size");
    } else if (price === "") {
      toast.info("select producte price");
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);
  
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      try {
        const response = await toast.promise(
          axios.post(backendUrl + "/api/v1/producte/add", formData, {
            headers: { Authorization: "Bearer " + token },
          }),
          {
            pending: "Submitting your data...",
            success: "Data submitted successfully!",
            error: "Failed to submit data. Please try again.",
          }
        );
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } catch (err) {
        toast.error("Failed to submit data. Please try again.");
        console.log(err)
      }
    }




    
  //   try {
  //     const response = await toast.promise(
  //       axios.post(backendUrl + "/api/v1/producte/add", formData, {
  //         headers: { Authorization: "Bearer " + token },
  //       }),
  //       {
  //         pending: "Submitting your data...",
  //         success: "Data submitted successfully!",
  //         error: "Failed to submit data. Please try again.",
  //       }
  //     );
  //     setName("");
  //     setDescription("");
  //     setImage1(false);
  //     setImage2(false);
  //     setImage3(false);
  //     setImage4(false);
  //     setPrice("");
  //   } catch (err) {
  //     toast.error("Failed to submit data. Please try again.");
  //   }
  }
  return (
    <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
      <form
        onSubmit={submitHandeler}
        className="flex flex-col w-full items-start gap-4"
      >
        <div>
          <p>Upload Image</p>
          <div className="flex gap-3 mt-2 ">
            <label htmlFor="image1">
              <img
                src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
                alt="upload_area"
                className="w-20"
              />
              <input
                type="file"
                onChange={(e) => setImage1(e.target.files[0])}
                id="image1"
                hidden
              />
            </label>
            <label htmlFor="image2">
              <img
                src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
                alt="upload_area"
                className="w-20"
              />
              <input
                type="file"
                id="image2"
                onChange={(e) => setImage2(e.target.files[0])}
                hidden
              />
            </label>
            <label htmlFor="image3">
              <img
                src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
                alt="upload_area"
                className="w-20"
              />
              <input
                type="file"
                id="image3"
                onChange={(e) => setImage3(e.target.files[0])}
                hidden
              />
            </label>
            <label htmlFor="image4">
              <img
                src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
                alt="upload_area"
                className="w-20"
              />
              <input
                type="file"
                id="image4"
                onChange={(e) => setImage4(e.target.files[0])}
                hidden
              />
            </label>
          </div>
        </div>
        <div className="w-full">
          <p className="mb-2">Product name</p>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="w-full max-w-[500px] px-3 py-2 border border-gray-400 rounded-md focus:outline-pink-400 "
            placeholder="Type here"
            required
          />
        </div>
        <div className="w-full">
          <p className="mb-2">Product description</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            type="text"
            className="w-full max-w-[500px] px-3 py-2 border border-gray-400 rounded-md focus:outline-pink-400 "
            placeholder="Write content here"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
          <div>
            <p className="mb-2">Product category</p>
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-pink-400"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Sub category</p>
            <select
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-pink-400"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Product Price</p>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              className="w-full px-3 py-2 sm:w-[120px] border border-gray-400 rounded-md focus:outline-pink-400"
              placeholder="25"
            />
          </div>
        </div>
        <div>
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3">
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("S")
                    ? prev.filter((item) => item !== "S")
                    : [...prev, "S"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
                }  px-3 py-1 cursor-pointer`}
              >
                S
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("M")
                    ? prev.filter((item) => item !== "M")
                    : [...prev, "M"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
                } px-3 py-1 cursor-pointer`}
              >
                M
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("L")
                    ? prev.filter((item) => item !== "L")
                    : [...prev, "L"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
                }  px-3 py-1 cursor-pointer`}
              >
                L
              </p>
            </div>
            <div
              onClick={() =>
                setSizes((prev) =>
                  prev.includes("XL")
                    ? prev.filter((item) => item !== "XL")
                    : [...prev, "XL"]
                )
              }
            >
              <p
                className={`${
                  sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
                }  px-3 py-1 cursor-pointer`}
              >
                XL
              </p>
            </div>
            <div
              onClick={() => {
                setSizes((prev) =>
                  prev.includes("XXL")
                    ? prev.filter((item) => item !== "XXL")
                    : [...prev, "XXL"]
                );
              }}
            >
              <p
                className={`${
                  sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
                }  px-3 py-1 cursor-pointer`}
              >
                XXL
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="checkbox"
            id="bestseller"
            onChange={() => setBestseller((prev) => !prev)}
          />
          <label htmlFor="bestseller" className="cursor-pointer">
            bestseller
          </label>
        </div>
        <button className="w-28 py-3 mt-3 bg-black text-white">ADD</button>
      </form>
    </div>
  );
}

export default AddItem;
