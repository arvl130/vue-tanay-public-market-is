import { useRouter } from "vue-router";

export default (funcToExec, name, params = {}, query = {}) => {
  const router = useRouter();
  return async (...args) => {
    await funcToExec(...args);
    router.push({ name, params, query });
  };
};
