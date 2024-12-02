<template>
  <el-dialog
    v-model="isOpen"
    width="350px"
    class="h-1/4 relative"
    :show-close="false"
  >
    <div class="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-2xl font-bold">
      是否退出登录
    </div>
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 space-x-10">
      <el-button size="large" @click="() => isOpen = false">
        取消
      </el-button>
      <el-button type="danger" size="large" @click="onQuitLogin">
        退出
      </el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, defineExpose, defineEmits } from "vue";

const isOpen = ref<boolean>(false);
const onOpen = () => {
  isOpen.value = true;
};

defineExpose({
  onOpen
});

const emit = defineEmits<{ (event: "quitLogin"): void }>();

const onQuitLogin = () => {
  emit("quitLogin");
};

</script>