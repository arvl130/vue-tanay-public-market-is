import { db } from "../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

export default async (tenant_uid) => {
  const q = query(
    collection(db, "tpmis_payments"),
    where("status", "==", "fulfilled"),
    where("tenant_uid", "==", tenant_uid)
  );

  const paymentUIDs = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    paymentUIDs.push({
      uid: doc.id,
      ...doc.data(),
    });
  });

  return paymentUIDs;
};
