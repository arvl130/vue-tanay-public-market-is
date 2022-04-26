import getToken from "../auth/getToken";
import backendBaseURL from "./backendBaseURL";

export default async (tenant) => {
  const { uid, username, firstName, lastName, account_type, stores } = tenant;

  if (!uid || !username || !firstName || !lastName || !account_type || !stores)
    throw new Error("Invalid arguments");

  const idToken = await getToken();
  const response = await fetch(`${backendBaseURL}/users/tenants/${uid}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tenant),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message);
    error.status = response.status;
    throw error;
  }

  return data.user;
};
