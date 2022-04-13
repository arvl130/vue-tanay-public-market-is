import "../../firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth();

export default async () => {
  try {
    const idToken = await auth.currentUser.getIdToken(/* forceRefresh */ true);
    return idToken;
  } catch (e) {
    console.log("Could not get a new ID token:", e);
  }
};
