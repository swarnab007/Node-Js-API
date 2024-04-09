import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

// uploading file on cloudinary
const uploadCloudinary = async (localFilePath) => {
  try {
    if (localFilePath) {
     // console.log("path",localFilePath.path);
      let res = await cloudinary.uploader.upload(localFilePath.path, {
        resource_type: "auto",
      });
      // remove the file if uploaded
     // fs.unlinkSync(localFilePath);
      console.log("Flie uploaded successfully",res.url);
      return res;
    }
    else {
      return null;
    }
  } catch (error) {
    // remove the file from server
    // fs.unlinkSync(localFilePath);
     console.log("cloudinary upload error",error);
    return error;
  }
};

export default uploadCloudinary;