import "../../firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth();

export default async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) return false;

  const idTokenResult = await auth.currentUser.getIdTokenResult();
  if (idTokenResult.claims.account_type === "admin") return true;
  else false;
};
