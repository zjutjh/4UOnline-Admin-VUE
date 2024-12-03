<template>
  <div class="h-full w-full relative">
    <div>
      <div class="inline-block cursor-pointer" @click="() => router.push('/main/equity-code')">
        <el-icon>
          <arrow-left-bold />
        </el-icon>
      </div>
      <div class="inline-block font-bold text-lg ml-2">
        新建权益码
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ArrowLeftBold } from "@element-plus/icons-vue";
</script>