import { db } from "../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

export default async () => {
  const q = query(
    collection(db, "tpmis_users"),
    where("account_type", "==", "tenant")
  );

  const tenants = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    tenants.push({
      uid: doc.id,
      ...doc.data(),
    });
  });

  return tenants;
};
