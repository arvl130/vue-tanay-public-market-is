import { db } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { onUnmounted, ref } from "vue";

export default (admin_uid) => {
  const noticeLetters = ref([]);

  const q = query(
    collection(db, "tpmis_letters"),
    where("admin_uid", "==", admin_uid)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const notice_letters = [];
    querySnapshot.forEach((doc) => {
      notice_letters.push({
        uid: doc.id,
        ...doc.data(),
      });
    });
    noticeLetters.value = notice_letters;
  });

  onUnmounted(() => {
    unsubscribe();
  });

  return noticeLetters;
};
