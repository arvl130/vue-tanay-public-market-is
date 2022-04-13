import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default async (letter_uid) => {
  await deleteDoc(doc(db, "tpmis_letters", letter_uid));
};
