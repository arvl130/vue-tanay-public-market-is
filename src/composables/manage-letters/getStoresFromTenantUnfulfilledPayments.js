import { db } from "../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import getStore from "./getStore";

export default async (tenant_uid) => {
  const q = query(
    collection(db, "tpmis_payments"),
    where("tenant_uid", "==", tenant_uid)
  );

  const storeIDs = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const paymentData = doc.data();
    paymentData.stores.forEach((store) => {
      if (!storeIDs.includes(store)) storeIDs.push(store);
    });
  });

  const stores = [];
  storeIDs.forEach((store_id) => {
    stores.push(getStore(store_id));
  });

  return Promise.all(stores);
};
