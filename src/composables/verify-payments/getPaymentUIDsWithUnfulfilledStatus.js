import { db } from "../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

export default async () => {
  const q = query(
    collection(db, "tpmis_payments"),
    where("status", "==", "pending")
  );

  const paymentUIDs = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    paymentUIDs.push(doc.id);
  });

  return paymentUIDs;
};
