import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default async (tenant_uid) => {
  try {
    const docSnap = await getDoc(doc(db, "tpmis_users", tenant_uid));
    if (docSnap.exists()) {
      return {
        uid: tenant_uid,
        ...docSnap.data(),
      };
    } else {
      throw new Error(`No such tenant found with UID: ${tenant_uid}`);
    }
  } catch (e) {
    console.error(e);
  }
};
