import { defineStore } from "pinia";
import { ref } from "vue";

const useLoginStore = defineStore("login",
  () => {
    const state = ref<boolean>(false);
    const userId = ref<string>("");
    return {
      state,
      userId
    };
  },
  { persist: true }
);

export default useLoginStore;