import mongoose from "mongoose";

function dbConnection() {
  mongoose
    .connect(process.env.DB_CON)
    .then(() => console.log("db connection is success"))
    .catch(() =>
      console.log("db connection is not success some error is occured")
    );
}

export default dbConnection;
