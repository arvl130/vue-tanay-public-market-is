import { db } from "../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

export default async (tenant_uid) => {
  const q = query(
    collection(db, "tpmis_stores"),
    where("owner_uid", "==", tenant_uid)
  );

  const stores = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    stores.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return stores;
};
