<template>
  <div class="relative h-screen">
    <div class="absolute left-0 top-0 bottom-0 flex items-center justify-center w-1/2">
      <Img src="../../../public/foryouicon.svg" class="w-1/3" />
    </div>

    <div class="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-400 " />

    <div class="absolute right-0 top-0 bottom-0 flex items-center justify-center w-1/2">
      <el-card shadow="always" class="w-1/2 relative" style="height: 50%;">
        <template #header>
          <div class="font-bold text-xl">
            浙江工业大学权益服务系统
          </div>
        </template>
        <el-form
          :model="userInfo"
          :rules="inputRule"
          size="large"
          label-position="top"
        >
          <el-form-item prop="student_id" label="账号" class="mt-5">
            <el-input v-model="userInfo.student_id" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model="userInfo.password" type="password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item>
            <div class="w-full flex justify-center gap-10 mt-4">
              <el-button class="w-1/4" @click="clearUserInfo">
                清空
              </el-button>
              <el-button type="primary" class="w-1/4" @click="onLogin">
                登录
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";

import { useLoginStore } from "@/stores";

import router from "@/router";

import loginByPwd from "@/apis/Login";

const loginStore = useLoginStore();

interface UserInfoType {
  student_id: string;
  password: string
}
const userInfo = ref<UserInfoType>({
  student_id: "",
  password: ""
});

const clearUserInfo = () => {
  userInfo.value = {
    student_id: "",
    password: ""
  };
};

const inputRule: any = {
  student_id: [
    { required: true, message: "账号不能为空", trigger: "blur" }
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" }
  ]
};

const onLogin = async () => {
  if (userInfo.value.password === "" || userInfo.value.student_id === "") {
    ElMessage.error("账号或密码不能为空");
  } else {
    const loginResponse = await loginByPwd({
      student_id: userInfo.value.student_id,
      password: userInfo.value.password
    });
    if (loginResponse.status !== true) {
      ElMessage.error("网络错误");
    } else if (loginResponse.data.code !== 200) {
      ElMessage.error(loginResponse.data.msg);
    } else if (loginResponse.data.data.user.userType === 1 || loginResponse.data.data.user.userType === 2) {
      ElMessage.error("您无权登陆此后台系统");
    } else {
      loginStore.state = true;
      loginStore.userId = loginResponse.data.data.user.studentID;
      router.push("/main");
    }
  }
};

</script>

<style scoped></style>