import { db } from "../../firebase";
import { doc, collection, setDoc } from "firebase/firestore";

export default async (newReceipt) => {
  try {
    const receiptsRef = doc(collection(db, "tpmis_receipts"));
    await setDoc(receiptsRef, newReceipt);
  } catch (error) {
    console.log(`Error while submitting new receipt:`, error);
  }
};
