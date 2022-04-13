import { db } from "../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

export default async () => {
  const q = query(
    collection(db, "tpmis_payments"),
    where("status", "!=", "fulfilled")
  );

  const tenantUIDs = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const tenant_uid = doc.data().tenant_uid;
    if (!tenantUIDs.includes(tenant_uid)) tenantUIDs.push(tenant_uid);
  });

  return tenantUIDs;
};
