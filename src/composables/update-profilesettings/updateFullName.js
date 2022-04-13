import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default async (uid, firstName, lastName) => {
  try {
    const userRef = doc(db, "tpmis_users", uid);
    setDoc(userRef, { firstName, lastName }, { merge: true });
  } catch (e) {
    console.error("Error while updating user full name:", e);
  }
};
