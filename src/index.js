import connectToDatabase from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import app from "./app.js";
import cloudinaryconnect from "./utils/cloudinaryconnect.js";

const PORT = 4000;

connectToDatabase()
  .then(() => {
    // console.log(process.env.PORT);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error", error);
  });


  app.get('/', (req, res) => {
    res.send("App is running");
  })
cloudinaryconnect();
