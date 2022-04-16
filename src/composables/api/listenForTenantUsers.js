import { db } from "../../firebase";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { onUnmounted, ref } from "vue";

export default () => {
  const q = query(
    collection(db, "tpmis_users"),
    where("account_type", "==", "tenant")
  );

  const tenantUsers = ref([]);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const payments = [];
    querySnapshot.forEach((doc) => {
      payments.push({
        uid: doc.id,
        ...doc.data(),
      });
    });
    tenantUsers.value = payments;
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return tenantUsers;
};
