import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default async (uid, phoneNumber) => {
  try {
    const userRef = doc(db, "tpmis_users", uid);
    setDoc(userRef, { phoneNumber }, { merge: true });
  } catch (e) {
    console.error("Error while updating user phone number:", e);
  }
};
