import "../../firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth();

export default async () => {
  const idTokenResult = await auth.currentUser.getIdTokenResult();
  if (idTokenResult.claims.account_type === "tenant") return true;
  else false;
};
