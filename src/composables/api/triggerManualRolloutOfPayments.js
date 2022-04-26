import getToken from "../auth/getToken";
import backendBaseURL from "./backendBaseURL";

export default async () => {
  const idToken = await getToken();
  const response = await fetch(
    `${backendBaseURL}/settings/firstrun/create-payments`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message);
    error.status = response.status;
    throw error;
  }
  return data.message;
};
