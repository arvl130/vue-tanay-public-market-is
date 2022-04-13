import { db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import resetTenantStores from "../../../garbagebin/resetTenantStores";

export default async (currTenant) => {
  const { tenant_uid, firstName, lastName, account_type, stores } = currTenant;

  try {
    // Update tenant record on database.
    await setDoc(doc(db, "tpmis_users", tenant_uid), {
      firstName,
      lastName,
      account_type,
    });

    // Reset stores with tenant UID.
    await resetTenantStores(tenant_uid);

    // Assign stores to tenant.
    stores.map(async (store) => {
      await setDoc(
        doc(db, "tpmis_stores", store),
        {
          owner_uid: tenant_uid,
        },
        { merge: true }
      );
    });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    console.log(`err:`, errorCode, errorMessage);
  }
};
