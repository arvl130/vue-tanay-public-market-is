import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();

export default async (image_path) => {
  const imageRef = ref(storage, image_path);

  try {
    await deleteObject(imageRef);
  } catch (error) {
    console.log(`Error while deleting remote file: ${image_path}`, error);
  }
};
