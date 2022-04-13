import { db } from "../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import getPaymentUIDsWithUnfulfilledStatus from "./getPaymentUIDsWithUnfulfilledStatus";

export default async (tenant_uid) => {
  const payment_uids_with_unfulfilled_status =
    await getPaymentUIDsWithUnfulfilledStatus();

  const q = query(
    collection(db, "tpmis_receipts"),
    where("tenant_uid", "==", tenant_uid),
    where("payment_uid", "in", payment_uids_with_unfulfilled_status)
  );

  const paymentUIDs = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const receipt = doc.data();
    if (!paymentUIDs.includes(receipt.payment_uid))
      paymentUIDs.push(receipt.payment_uid);
  });

  return paymentUIDs;
};
