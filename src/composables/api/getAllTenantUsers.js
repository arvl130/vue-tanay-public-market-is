import getToken from "../auth/getToken";

export default async () => {
  try {
    const idToken = await getToken();
    const response = await fetch(
      "https://node-tanay-public-market-is.herokuapp.com/users/tenants",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(`Got status code ${response.status}: ${data.message}`);
    }

    return data.users;
  } catch (e) {
    console.log("Could not fetch all tenant users:", e);
  }
};
