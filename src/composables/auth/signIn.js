import "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export default async (user_credentials) => {
  const { username, password } = user_credentials;
  const email = `${username}@noemail.com`;
  const userCredentials = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredentials.user;
};
