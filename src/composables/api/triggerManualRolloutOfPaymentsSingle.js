import getToken from "../auth/getToken";

export default async (tenant_uid) => {
  const idToken = await getToken();
  const response = await fetch(
    `http://localhost:5000/settings/firstrun/create-payments/${tenant_uid}`,
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
