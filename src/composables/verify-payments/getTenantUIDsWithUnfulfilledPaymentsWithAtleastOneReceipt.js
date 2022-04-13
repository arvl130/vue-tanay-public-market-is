import { db } from "../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import getPaymentUIDsWithUnfulfilledStatus from "./getPaymentUIDsWithUnfulfilledStatus";

export default async () => {
  const payment_uids_with_unfulfilled_status =
    await getPaymentUIDsWithUnfulfilledStatus();

  const q = query(
    collection(db, "tpmis_receipts"),
    where("payment_uid", "in", payment_uids_with_unfulfilled_status)
  );

  const tenantUIDs = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const receipt = doc.data();
    if (!tenantUIDs.includes(receipt.tenant_uid))
      tenantUIDs.push(receipt.tenant_uid);
  });

  return tenantUIDs;
};
