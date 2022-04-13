import { db } from "../../firebase";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { onUnmounted, ref } from "vue";

export default (receipt_uid) => {
  const q = query(
    collection(db, "tpmis_tickets"),
    where("receipt_uid", "==", receipt_uid)
  );

  const tickets = ref([]);

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const curr_tickets = [];
    querySnapshot.forEach((doc) => {
      curr_tickets.push({
        uid: doc.id,
        ...doc.data(),
      });
    });

    tickets.value = curr_tickets;
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return tickets;
};
