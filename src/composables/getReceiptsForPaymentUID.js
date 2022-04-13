import { db } from "../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

export default async (payment_uid) => {
  const q = query(
    collection(db, "tpmis_receipts"),
    where("payment_uid", "==", payment_uid)
  );

  const paymentReceipts = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    paymentReceipts.push({
      uid: doc.id,
      ...doc.data(),
    });
  });

  return paymentReceipts;
};
