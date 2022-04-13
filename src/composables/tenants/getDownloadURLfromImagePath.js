import "../../firebase";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();

export default async (imageFullPath) => {
  try {
    if (!imageFullPath) return "";

    const download_url = await getDownloadURL(ref(storage, imageFullPath));
    return download_url;
  } catch (error) {
    console.log("Error while getting download URL of image:", error);
  }
};
