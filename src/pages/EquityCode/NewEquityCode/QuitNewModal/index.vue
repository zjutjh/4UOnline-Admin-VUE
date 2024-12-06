<template>
  <el-dialog
    v-model="isOpen"
    width="420px"
    class="h-1/4 relative"
    :show-close="false"
  >
    <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-md">
      您的编辑还未保存，是否确认退出
    </div>
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 space-x-10">
      <el-button size="large" @click="() => isOpen = false">
        取消
      </el-button>
      <el-button type="danger" size="large" @click="() => router.push('/main/equity-code')">
        退出
      </el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue";

import router from "@/router";

const isOpen = ref<boolean>(false);
const onOpen = () => {
  isOpen.value = true;
};

defineExpose({
  onOpen
});

</script>