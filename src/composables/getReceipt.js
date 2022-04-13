import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default async (receipt_uid) => {
  try {
    const docSnap = await getDoc(doc(db, "tpmis_receipts", receipt_uid));

    if (docSnap.exists()) {
      return {
        uid: receipt_uid,
        ...docSnap.data(),
      };
    } else {
      throw new Error(`No such receipt found with UID: ${receipt_uid}`);
    }
  } catch (e) {
    console.error(e);
  }
};
