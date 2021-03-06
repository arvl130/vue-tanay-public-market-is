import getToken from "../auth/getToken";
import backendBaseURL from "./backendBaseURL";

export default async (tenant_uid) => {
  try {
    if (!tenant_uid) throw new Error("Invalid argument");

    const idToken = await getToken();
    const response = await fetch(
      `${backendBaseURL}/users/tenants/${tenant_uid}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(response);
      throw new Error(`Got status code ${response.status}: ${data.message}`);
    }

    return data.user;
  } catch (e) {
    console.log("Could not delete user:", e);
  }
};
