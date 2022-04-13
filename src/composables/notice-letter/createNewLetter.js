import { db } from "../../firebase";
import { doc, collection, setDoc } from "firebase/firestore";

export default async (newLetter) => {
  try {
    const lettersRef = doc(collection(db, "tpmis_letters"));
    await setDoc(lettersRef, newLetter);
  } catch (error) {
    console.log(`Error while submitting new receipt:`, error);
  }
};
