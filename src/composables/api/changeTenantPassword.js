import getToken from "../auth/getToken";

export default async (uid, newPassword) => {
  if (!newPassword || !uid) throw new Error("Invalid arguments");

  const idToken = await getToken();
  const response = await fetch(
    `https://node-tanay-public-market-is.herokuapp.com/users/tenants/${uid}/pwreset`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword }),
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
