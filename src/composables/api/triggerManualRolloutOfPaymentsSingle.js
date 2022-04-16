import getToken from "../auth/getToken";

export default async (tenant_uid) => {
  const idToken = await getToken();
  const response = await fetch(
    `https://node-tanay-public-market-is.herokuapp.com/settings/firstrun/create-payments/${tenant_uid}`,
    {
      method: "POST",
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
