import { db } from "../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import getTenant from "../getTenant";

export default async () => {
  const q = query(
    collection(db, "tpmis_payments"),
    where("status", "==", "pending")
  );

  const tenantUIDsWithUnverifiedPayments = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const payment = doc.data();
    if (!tenantUIDsWithUnverifiedPayments.includes(payment.tenant_uid))
      tenantUIDsWithUnverifiedPayments.push(payment.tenant_uid);
  });

  const tenantsWithUnverifiedPayments = [];

  tenantUIDsWithUnverifiedPayments.forEach((tenant_uid) => {
    tenantsWithUnverifiedPayments.push(getTenant(tenant_uid));
  });

  return Promise.all(tenantsWithUnverifiedPayments);
};
