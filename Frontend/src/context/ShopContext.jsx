import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const shopContext = createContext();
export const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const addToCard = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size!");
      return;
    }
    let cardData = structuredClone(cartItems);
    if (cardData[itemId]) {
      if (cardData[itemId][size]) {
        cardData[itemId][size] += 1;
      } else {
        cardData[itemId][size] = 1;
      }
    } else {
      cardData[itemId] = {};
      cardData[itemId][size] = 1;
    }
    setCartItems(cardData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/v1/card/add",
          { itemId, size },
          { headers: { Authorization: "Bearer " + token } }
        );
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };
  const updateQuantity = async (itemId, size, quantity) => {
    let cardData = structuredClone(cartItems);
    cardData[itemId][size] = quantity;
    setCartItems(cardData);
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/v1/card/update",
          { itemId, size, quantity },
          { headers: { Authorization: "Bearer " + token } }
        );
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
  };
  // get card data
  const getCardData = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/v1/card",
        {},
        { headers: { Authorization: "Bearer " + token } }
      );
      if (response.data.cardData) {
        setCartItems(response.data.cardData);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  const getCardAmount = () => {
    let totalAmout = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmout += itemInfo.price * cartItems[items][item];
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalAmout;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/v1/producte/list");
      if (response.data.products) {
        setProducts(response.data.products);
      } else {
        throw new Error("data is not found!");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  useEffect(() => {
    if (token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getCardData(localStorage.getItem("token"));
    }
    getProductsData()
  }, []);
  const currency = "$";
  const delivery_fee = 10;
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addToCard,
    cartItems,
    getCartCount,
    updateQuantity,
    getCardAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
  };
  return (
    <shopContext.Provider value={value}>{props.children} </shopContext.Provider>
  );
};
