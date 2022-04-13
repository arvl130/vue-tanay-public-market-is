import getToken from "../auth/getToken";

export default async (tenant) => {
  const { username, password, firstName, lastName, account_type, stores } =
    tenant;

  if (
    !username ||
    !password ||
    !firstName ||
    !lastName ||
    !account_type ||
    !stores
  )
    throw new Error("Invalid arguments");

  const idToken = await getToken();
  const response = await fetch(
    "https://node-tanay-public-market-is.herokuapp.com/users/tenants",
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tenant),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message);
    error.status = response.status;
    throw error;
  }

  return data.user;
};
