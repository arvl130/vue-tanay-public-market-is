import { db } from "../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

export default async () => {
  const q = query(
    collection(db, "tpmis_receipts"),
    where("status", "==", "submitted")
  );

  const tenantPaymentUIDs = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const receiptPaymentUID = doc.data().payment_uid;
    if (!tenantPaymentUIDs.includes(receiptPaymentUID))
      tenantPaymentUIDs.push(receiptPaymentUID);
  });

  return tenantPaymentUIDs;
};
