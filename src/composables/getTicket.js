import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default async (ticket_uid) => {
  try {
    const docSnap = await getDoc(doc(db, "tpmis_tickets", ticket_uid));

    if (docSnap.exists()) {
      return {
        uid: ticket_uid,
        ...docSnap.data(),
      };
    } else {
      throw new Error(`No such ticket found with UID: ${ticket_uid}`);
    }
  } catch (e) {
    console.error(e);
  }
};
