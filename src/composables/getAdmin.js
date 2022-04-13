import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default async (admin_uid) => {
  try {
    const docSnap = await getDoc(doc(db, "tpmis_users", admin_uid));
    if (docSnap.exists()) {
      return {
        uid: admin_uid,
        ...docSnap.data(),
      };
    } else {
      throw new Error(`No such admin found with UID: ${admin_uid}`);
    }
  } catch (e) {
    console.error(e);
  }
};
