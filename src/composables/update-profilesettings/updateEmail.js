import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default async (uid, email) => {
  try {
    const userRef = doc(db, "tpmis_users", uid);
    setDoc(userRef, { email }, { merge: true });
  } catch (e) {
    console.error("Error while updating user email:", e);
  }
};
