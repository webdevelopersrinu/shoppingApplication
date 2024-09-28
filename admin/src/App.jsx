import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Leftbar from "./components/Leftbar";
import { Route, Router, Routes } from "react-router-dom";
import AddItem from "./pages/AddItem";
import IteamList from "./pages/IteamList";
import OrderItem from "./pages/OrderItem";
import Login from "./pages/Login";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";
function App() {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        {token === "" ? (
          <Login setToken={setToken} />
        ) : (
          <>
            <Navbar setToken={setToken} />
            <hr />
            <div className="flex w-full">
              <Leftbar />
              <Routes>
                <Route path="/add" element={<AddItem token={token} />} />
                <Route path="/list" element={<IteamList token={token} />} />
                <Route path="/orders" element={<OrderItem token={token} />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
