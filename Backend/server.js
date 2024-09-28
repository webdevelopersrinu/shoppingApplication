import express from "express";
import cors from "cors";
import "dotenv/config";
import dbConnection from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import { CustomeError } from "./utils/customeError.js";
import { globalErrorHandeler } from "./utils/glowbalError.js";
import { AuthRoutse } from "./routes/authRoutes.js";
import productRoutes from "./routes/producteRoutes.js";
import { CardRoutse } from "./routes/cardRoutes.js";
import { OrderRoutse } from "./routes/orderRoutes.js";

// app confing
const app = express();
const port = process.env.PORT || 2345;
dbConnection();
connectCloudinary();

// middleware
app.use(express.json());
app.use(cors());

// routs
app.get("/", (req, res) => {
  res.status(200).send("API is working");
});

app.use("/api/v1/user", AuthRoutse);
app.use("/api/v1/producte", productRoutes);
app.use("/api/v1/card", CardRoutse);
app.use("/api/v1/order", OrderRoutse);

app.all("*", (req, res, next) => {
  let err = new CustomeError(
    `page not found this end point ${req.originalUrl}`,
    404
  );
  next(err);
});

app.use(globalErrorHandeler);

app.listen(port, () => console.log("server is start runing"));
