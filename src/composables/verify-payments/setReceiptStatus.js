import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default async (receipt_uid, status) => {
  try {
    switch (status) {
      case "submitted":
      case "confirmed":
      case "for resubmission":
        break;
      default:
        throw new Error("Invalid status.");
    }

    if (!receipt_uid) {
      throw new Error("Invalid receipt UID.");
    }

    const receiptRef = doc(db, "tpmis_receipts", receipt_uid);
    setDoc(receiptRef, { status: status }, { merge: true });
  } catch (e) {
    console.error(`Error while setting receipt status to ${status}:`, e);
  }
};
