import "../../firebase";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export default async () => {
  try {
    await signOut(auth);
    console.log("Logged out user.");
  } catch (e) {
    console.log("Error occured while logging out user:", e);
  }
};
