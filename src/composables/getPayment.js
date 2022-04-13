import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default async (payment_uid) => {
  try {
    const docSnap = await getDoc(doc(db, "tpmis_payments", payment_uid));

    if (docSnap.exists()) {
      return {
        uid: payment_uid,
        ...docSnap.data(),
      };
    } else {
      throw new Error(`No such payment found with UID: ${payment_uid}`);
    }
  } catch (e) {
    console.error(e);
  }
};
