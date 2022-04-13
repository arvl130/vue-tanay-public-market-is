import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
export default async (receipt_uid, currReceipt) => {
  try {
    const receiptsRef = doc(db, "tpmis_receipts", receipt_uid);
    await setDoc(receiptsRef, currReceipt);
  } catch (error) {
    console.log(`Error while submitting new receipt:`, error);
  }
};
