import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import getPendingPaymentsOfTenant from "../tenants/getPendingPaymentsOfTenant";

export default async (tenant_uid) => {
  const pendingPayments = await getPendingPaymentsOfTenant(tenant_uid);

  const pendingPaymentUids = [];
  const totalBalance = pendingPayments.reduce((runningBalance, payment) => {
    pendingPaymentUids.push(payment.uid);
    return payment.amount + runningBalance;
  }, 0);

  const q = query(
    collection(db, "tpmis_receipts"),
    where("payment_uid", "in", pendingPaymentUids)
  );

  const receiptAmounts = [];

  const pendingPaymentReceiptsSnapshot = await getDocs(q);
  if (!pendingPaymentReceiptsSnapshot.empty) {
    pendingPaymentReceiptsSnapshot.forEach((doc) => {
      const receipt = doc.data();
      receiptAmounts.push(receipt.amount);
    });
  }

  const totalPaid = receiptAmounts.reduce((runningAmount, amount) => {
    return amount + runningAmount;
  }, 0);

  const totalCurrentBalance = totalBalance - totalPaid;
  return totalCurrentBalance;
};
