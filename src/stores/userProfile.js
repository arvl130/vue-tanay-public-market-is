import { defineStore } from "pinia";
import getUser from "../composables/getAdmin";

export const useUserProfileStore = defineStore({
  id: "userProfile",
  state: () => ({
    uid: null,
    firstName: "",
    lastName: "",
    accountType: null,
  }),
  getters: {
    isLoggedIn: (state) => {
      if (state.uid) return true;
      else false;
    },
    isAdmin: (state) => {
      if (state.accountType === "admin") return true;
      else return false;
    },
  },
  actions: {
    async setupUser(user_uid) {
      this.uid = user_uid;
      const { firstName, lastName, account_type } = await getUser(user_uid);
      this.firstName = firstName;
      this.lastName = lastName;
      this.accountType = account_type;
    },
  },
});
