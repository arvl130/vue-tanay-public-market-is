import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import getPendingPaymentsOfTenant from "../tenants/getPendingPaymentsOfTenant";

export default async (tenant_uid) => {
  const pendingPayments = await getPendingPaymentsOfTenant(tenant_uid);
  const pendingPaymentUIDs = [];

  pendingPayments.forEach((payment) => {
    pendingPaymentUIDs.push(payment.uid);
  });

  const receiptsOfPendingPayments = [];

  const q = query(
    collection(db, "tpmis_receipts"),
    where("payment_uid", "in", pendingPaymentUIDs)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    receiptsOfPendingPayments.push({
      uid: doc.id,
      ...doc.data(),
    });
  });

  const totalPaidInPendingPayments = receiptsOfPendingPayments.reduce(
    (amount, receipt) => {
      if (receipt.status === "confirmed") {
        return amount + receipt.amount;
      } else {
        return amount;
      }
    },
    0
  );

  const totalOwnedInPendingPayments = pendingPayments.reduce(
    (amount, payment) => {
      return amount + payment.amount;
    },
    0
  );

  const result = totalOwnedInPendingPayments - totalPaidInPendingPayments;
  return result;
};
