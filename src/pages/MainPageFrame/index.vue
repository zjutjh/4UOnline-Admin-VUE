<template>
  <div class="common-layout">
    <quit-modal ref="quitModalRef" @quit-login="quitLogin" />
    <el-container class="h-screen">
      <el-header class="w-screen border-gray-300 border-2" height="75px">
        <img src="../../../public/foryouicon.svg " class="w-12 mt-3">
        <div class="absolute left-24 top-6 font-bold text-2xl">
          权益服务系统后台
        </div>
        <div class="absolute right-32 top-6 font-bold text-2xl">
          ID: {{ loginStore.userId }}
        </div>
        <el-button
          class="absolute right-5"
          style="top: 22px;"
          @click="onOpenQuitModal"
        >
          退出登录
        </el-button>
      </el-header>
      <el-container>
        <el-aside class="h-full border-2 border-gray-300 border-t-0" width="200px">
          <el-menu :default-active="activeMenu">
            <el-menu-item index="1" class="border-b-2 border-gray-200" @click="() => router.push('/main/')">
              首页
            </el-menu-item>
            <el-menu-item index="2" class="border-b-2 border-gray-200" @click="() => router.push('/main/data-overview')">
              数据概览
            </el-menu-item>
            <el-menu-item index="3" class="border-b-2 border-gray-200" @click="() => router.push('/main/equity-code')">
              权益码管理
            </el-menu-item>
            <el-menu-item index="4" class="border-b-2 border-gray-200" @click="() => router.push('/main/question-feedback')">
              问题反馈
            </el-menu-item>
            <el-menu-item index="5" class="border-b-2 border-gray-200" @click="() => router.push('/main/consulting')">
              咨询管理
            </el-menu-item>
            <el-sub-menu index="6" class="border-b-2 border-gray-200">
              <template #title>
                通知管理
              </template>
              <el-menu-item class="border-t-2 border-b-2 border-gray-200" index="6-1" @click="() => router.push('/main/notify/announcement')">
                公告通知
              </el-menu-item>
              <el-menu-item class="border-b-2 border-gray-200" index="6-2" @click="() => router.push('/main/notify/lostfound')">
                失物寻物
              </el-menu-item>
              <el-menu-item class="border-b-2 border-gray-200" index="6-3" @click="() => router.push('/main/notify/activity')">
                校园活动
              </el-menu-item>
              <el-menu-item index="6-4" @click="() => router.push('/main/notify/website')">
                常用网站
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item class="border-b-2 border-gray-200" index="7" @click="() => router.push('/main/account')">
              账号管理
            </el-menu-item>
            <el-menu-item class="border-b-2 border-gray-200" index="8" @click="() => router.push('/main/clear')">
              备份清理
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { useLoginStore } from "@/stores";
import { ref, computed } from "vue";

import { QuitModal } from "@/components/index";

const loginStore = useLoginStore();

const quitLogin = () => {
  loginStore.state = false;
  loginStore.userId = "";
  router.push("/login");
};

// 动态设置菜单选中的索引
const activeMenu = computed(() => {
  const path = router.currentRoute.value.path;
  if (path.startsWith("/main/data-overview")) {
    return "2";
  } else if (path.startsWith("/main/equity-code")) {
    return "3";
  } else if (path.startsWith("/main/question-feedback")) {
    return "4";
  } else if (path.startsWith("/main/consulting")) {
    return "5";
  } else if (path.startsWith("/main/notify")) {
    return "6";
  } else if (path.startsWith("/main/account")) {
    return "7";
  } else if (path.startsWith("/main/clear")) {
    return "8";
  } else {
    return "1";
  }
});

const quitModalRef = ref();
const onOpenQuitModal = () => {
  quitModalRef.value.onOpen();
};

</script>