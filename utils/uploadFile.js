import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { resolve } from "path";

cloudinary.config({
  cloud_name: "dqp4lzkkf",
  api_key: "414774136966195",
  api_secret: "NDCmlOXVlw3liZ1-yIsKgWm3-zI",
});

const uploadToCloudinary = async ({ localImagepath }) => {
  if (!localImagepath) return null;

  try {
    const response = await cloudinary.uploader.upload(localImagepath, {
      resource_type: "auto",
    });
  
    return response.secure_url;
  } catch (err) {
    //
    fs.unlinkSync(localImagepath);
    console.log(err);
    return null;
  }
};

export { uploadToCloudinary };
