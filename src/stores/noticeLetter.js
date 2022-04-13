import { defineStore } from "pinia";

export const useNoticeLetter = defineStore({
  id: "noticeLetter",
  state: () => ({
    noticeLetter: null,
  }),
  getters: {
    getNoticeLetter: (state) => state.noticeLetter,
  },
  actions: {
    setNoticeLetter(noticeLetter) {
      if (
        noticeLetter.tenant_uid &&
        noticeLetter.tenant_uid !== "" &&
        noticeLetter.stores &&
        noticeLetter.stores.length > 0 &&
        Object.prototype.hasOwnProperty.call(noticeLetter, "penalty") &&
        noticeLetter.penalty >= 0 &&
        Object.prototype.hasOwnProperty.call(noticeLetter, "timestamp")
      )
        this.noticeLetter = noticeLetter;
    },
  },
});
