import { db } from "../../firebase";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { onUnmounted, ref } from "vue";

export default (tenant_uid) => {
  const q = query(
    collection(db, "tpmis_payments"),
    where("status", "==", "pending"),
    where("tenant_uid", "==", tenant_uid)
  );

  const unverfiedPayments = ref([]);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const payments = [];
    querySnapshot.forEach((doc) => {
      payments.push({
        uid: doc.id,
        ...doc.data(),
      });
    });
    unverfiedPayments.value = payments;
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return unverfiedPayments;
};
