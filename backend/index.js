import app from "./app.js";
import ConnectDB from "./db/db.js";
import dotenv from "dotenv"
dotenv.config();


ConnectDB()
  .then(() => {
    console.log("CORS_ORIGIN =", process.env.CORS_ORIGIN);
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running");
    });
  })
  .catch((error) => {
    console.log("Failed to connect db", error);
  });
