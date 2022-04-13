import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async (store_id) => {
  try {
    const docSnap = await getDoc(doc(db, "tpmis_stores", store_id));
    if (docSnap.exists()) {
      return {
        id: store_id,
        ...docSnap.data(),
      };
    } else {
      throw new Error(`No such store found with ID: ${store_id}`);
    }
  } catch (e) {
    console.error(e);
  }
};
