import app from "./app.js";
import ConnectDB from "./db/db.js";
import dotenv from "dotenv"
dotenv.config();


ConnectDB()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running");
    });
  })
  .catch((error) => {
    console.log("Failed to connect db", error);
  });
