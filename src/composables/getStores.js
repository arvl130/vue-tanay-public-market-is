import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default async (store_ids) => {
  const stores = [];

  store_ids.forEach(async (store_id) => {
    const docSnap = await getDoc(doc(db, "tpmis_stores", store_id));
    if (docSnap.exists()) {
      stores.push({
        id: docSnap.id,
        ...docSnap.data(),
      });
    }
  });

  return stores;
};
