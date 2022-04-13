import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default async (uid, fullPath) => {
  try {
    const userRef = doc(db, "tpmis_users", uid);
    setDoc(userRef, { profilePictureFullPath: fullPath }, { merge: true });
  } catch (e) {
    console.error("Error while updating user profile picture path:", e);
  }
};
