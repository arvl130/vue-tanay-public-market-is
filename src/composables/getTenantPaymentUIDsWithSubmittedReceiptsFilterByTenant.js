import { db } from "../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

export default async (tenant_uid) => {
  const q = query(
    collection(db, "tpmis_receipts"),
    where("status", "==", "submitted"),
    where("tenant_uid", "==", tenant_uid)
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
