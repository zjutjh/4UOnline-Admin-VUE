import { defineStore } from "pinia";
import { ref } from "vue";

const useLoginStore = defineStore("login",
  () => {
    const state = ref<boolean>(false);
    return {
      state
    };
  },
  { persist: true }
);

export default useLoginStore;