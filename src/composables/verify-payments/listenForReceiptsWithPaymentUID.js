import { db } from "../../firebase";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { onUnmounted, ref } from "vue";

export default (payment_uid) => {
  const q = query(
    collection(db, "tpmis_receipts"),
    where("payment_uid", "==", payment_uid)
  );

  const paymentReceipts = ref([]);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const receipts = [];
    querySnapshot.forEach((doc) => {
      receipts.push({
        uid: doc.id,
        ...doc.data(),
      });
    });

    paymentReceipts.value = receipts;
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return paymentReceipts;
};
