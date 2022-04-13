import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default async (letter_uid) => {
  try {
    const docSnap = await getDoc(doc(db, "tpmis_letters", letter_uid));

    if (docSnap.exists()) {
      return {
        uid: letter_uid,
        ...docSnap.data(),
      };
    } else {
      throw new Error(`No such letter found with UID: ${letter_uid}`);
    }
  } catch (e) {
    console.error(e);
  }
};
