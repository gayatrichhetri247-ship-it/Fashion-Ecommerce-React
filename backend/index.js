import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import ConnectDB from "./db/db.js";

console.log(process.env.MONGODB_URI);
ConnectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running");
    });
  })
  .catch((error) => {
    console.log("Failed to connect db", error);
  });