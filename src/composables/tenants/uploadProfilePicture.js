import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
const auth = getAuth();
const storage = getStorage();

export default async (profilePictureFile) => {
  const uid = auth.currentUser.uid;
  const remoteFilename = `profilepics/${uid}`;
  const storageRef = ref(storage, remoteFilename);

  try {
    return await uploadBytes(storageRef, profilePictureFile).then(
      (snapshot) => {
        return {
          fullPath: snapshot.metadata.fullPath,
        };
      }
    );
  } catch (error) {
    console.error("Error occured while uploading file:", error);
  }
};
