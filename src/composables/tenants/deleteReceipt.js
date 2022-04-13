import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default async (receipt_uid) => {
  await deleteDoc(doc(db, "tpmis_receipts", receipt_uid));
};
