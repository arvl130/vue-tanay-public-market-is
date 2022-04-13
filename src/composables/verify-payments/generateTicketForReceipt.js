import { db } from "../../firebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default async (receipt) => {
  const newTicketRef = doc(collection(db, "tpmis_tickets"));

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const admin_uid = currentUser.uid;

  if (!receipt.uid) throw new Error("Receipt UID is invalid:", receipt.uid);
  if (!receipt.tenant_uid)
    throw new Error("Tenant UID is invalid:", receipt.tenant_uid);
  if (!admin_uid) throw new Error("Admin UID is invalid:", admin_uid);
  if (!receipt.amount || receipt.amount < 0)
    throw new Error("Amount is invalid:", receipt.amount);

  await setDoc(newTicketRef, {
    receipt_uid: receipt.uid,
    tenant_uid: receipt.tenant_uid,
    payment_uid: receipt.payment_uid,
    admin_uid,
    amount: receipt.amount,
    date_issued: Timestamp.fromDate(new Date()),
  });
};
