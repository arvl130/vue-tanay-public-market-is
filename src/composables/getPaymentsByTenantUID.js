import { db } from "../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

export default async (tenant_uid, isFulfilled = true) => {
  const q = query(
    collection(db, "tpmis_payments"),
    where("tenant_uid", "==", tenant_uid),
    where("status", isFulfilled ? "==" : "!=", "fulfilled")
  );

  const tenantPayments = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    tenantPayments.push({
      uid: doc.id,
      ...doc.data(),
    });
  });

  return tenantPayments;
};
