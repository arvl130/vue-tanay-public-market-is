import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default async (uid, gender) => {
  try {
    const userRef = doc(db, "tpmis_users", uid);
    setDoc(userRef, { gender }, { merge: true });
  } catch (e) {
    console.error("Error while updating user full name path:", e);
  }
};
