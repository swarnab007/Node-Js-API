import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectToDatabase = async () => {
    console.log(process.env.DB_URL);
    try {
        const connectionRes = await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
        console.log(`Connected to database, Host : ${connectionRes.connection.host}`);
    } catch (error) {
        console.log("Error connecting to database", error);
        process.exit(1);
    }
}

export default connectToDatabase;