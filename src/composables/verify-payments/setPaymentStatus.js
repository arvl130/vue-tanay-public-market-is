import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default async (payment_uid, status) => {
  try {
    switch (status) {
      case "pending":
      case "fulfilled":
        break;
      default:
        throw new Error("Invalid status.");
    }

    if (!payment_uid) {
      throw new Error("Invalid payment UID.");
    }

    const paymentRef = doc(db, "tpmis_payments", payment_uid);
    setDoc(paymentRef, { status: status }, { merge: true });
  } catch (e) {
    console.error(`Error while setting payment status to ${status}:`, e);
  }
};
