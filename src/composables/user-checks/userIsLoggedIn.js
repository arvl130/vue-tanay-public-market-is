import "../../firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth();
export default () => {
  const currentUser = auth.currentUser;
  if (currentUser) {
    return true;
  }

  return false;
};
