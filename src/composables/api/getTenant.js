import getToken from "../auth/getToken";

export default async (tenant_uid) => {
  try {
    const idToken = await getToken();
    const response = await fetch(
      `https://node-tanay-public-market-is.herokuapp.com/users/tenants/${tenant_uid}`,
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Got status code ${response.status}: ${data.message}`);
    }

    return data.user;
  } catch (e) {
    console.log("Could not fetch tenant user:", e);
  }
};
