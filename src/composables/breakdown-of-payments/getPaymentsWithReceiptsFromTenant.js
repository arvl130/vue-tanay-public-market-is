import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import getPayment from "../getPayment";

export default async (tenant_uid) => {
  const q = query(
    collection(db, "tpmis_receipts"),
    where("tenant_uid", "==", tenant_uid),
    where("status", "==", "confirmed")
  );

  const paymentUids = [];

  const receiptsSnapshot = await getDocs(q);
  if (!receiptsSnapshot.empty) {
    receiptsSnapshot.forEach((doc) => {
      const receipt = doc.data();
      if (!paymentUids.includes(receipt.payment_uid))
        paymentUids.push(receipt.payment_uid);
    });
  }

  if (paymentUids.length === 0) return [];

  const payments = [];
  paymentUids.forEach((payment_uid) => {
    payments.push(getPayment(payment_uid));
  });

  return Promise.all(payments);
};
