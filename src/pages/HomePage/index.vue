<template>
  <div class="relative">
    <div class="font-bold text-5xl absolute left-24 top-12">
      欢迎你，来自{{ department }}的{{ loginStore.userId }}
    </div>
    <div class="font-bold text-4xl absolute left-64 top-64">
      今日新增反馈{{ newFeedback }}条，点击前往处理
      <el-button
        size="large"
        type="primary"
        class="ml-5 transform -translate-y-1"
        @click="onToFeedback"
      >
        前往处理
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLoginStore } from "@/stores";
import router from "@/router";
const department = ref("{{department}}");
const loginStore = useLoginStore();

const newFeedback = ref<number>(0);

const onToFeedback = () => {
  router.push("/main/question-feedback");
};
</script>