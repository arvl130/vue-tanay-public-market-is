import { getStorage, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const storage = getStorage();

export default async (receiptImageFile) => {
  const remoteFilename = `receipts/${uuidv4()}`;
  const storageRef = ref(storage, remoteFilename);

  try {
    return await uploadBytes(storageRef, receiptImageFile).then((snapshot) => {
      return {
        fullPath: snapshot.metadata.fullPath,
      };
    });
  } catch (error) {
    console.error("Error occured while uploading file:", error);
  }
};
