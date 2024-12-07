<template>
  <div class="relative w-full h-full">
    <div class="inline-block cursor-pointer" @click="onQuit">
      <el-icon>
        <arrow-left-bold />
      </el-icon>
    </div>
    <div class="inline-block font-bold text-lg ml-2">
      新建权益码
    </div>
    <div v-if="codeDetail" class="flex w-1/2 absolute transform -translate-x-1/2 left-1/2" style="height: 90%;width: 50%;">
      <div class="w-1/4 h-full inline-block border-2 border-gray-200">
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          权益码编号
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          创建时间
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          扫描次数
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          权益码类型
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          责任部门
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          负责单位
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          投放位置
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 40%;">
          权益码
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          状态
        </div>
        <div class="flex w-full justify-center items-center" style="height: 6.67%;">
          备注
        </div>
      </div>
      <div class="w-3/4 h-full inline-block border-2 border-l-0 border-gray-200">
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          {{ codeDetail.id }}
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          {{ codeDetail.created_at }}
        </div>
        <div class="flex w-full border-b-2 border-gray-200" style="height: 6.67%;">
          <div class="w-1/3 h-full border-r-2 border-gray-200 inline-block flex justify-center items-center">
            {{ codeDetail.scan_count }}
          </div>
          <div class="w-1/3 h-full border-r-2 border-gray-200 inline-block flex justify-center items-center">
            反馈次数
          </div>
          <div class="w-1/3 h-full inline-block flex justify-center items-center">
            {{ codeDetail.feedback_count }}
          </div>
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          {{ codeDetail.feedback_type }}
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          {{ codeDetail.college.name }}
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          {{ codeDetail.department }}
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          {{ codeDetail.location }}
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 40%;">
          123
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          {{ codeDetail.status }}
        </div>
        <div class="flex w-full justify-center items-center overflow-y-auto" style="height: 6.67%;">
          {{ codeDetail.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ArrowLeftBold } from "@element-plus/icons-vue";
import router from "@/router";
import { getCodeDetail } from "@/apis/EquityCode";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { feedbackType } from "../selectOptions";

const onQuit = () => {
  router.push("/main/equity-code");
};

// 获取页面详情
const id = useRoute().query.id;
const codeDetail = ref(null);
getCodeDetail(id).then(
  (response) => {
    // console.log(response);
    if (!response.status) {
      ElMessage.error("网络错误");
    } else if (response.data.code !== 200) {
      ElMessage.error(response.data.msg);
    } else {
      codeDetail.value = response.data.data;
      codeDetail.value.created_at = new Date(codeDetail.value.created_at).toISOString().split("T")[0];
      codeDetail.value.feedback_type = feedbackType[codeDetail.value.feedback_type].name;
      codeDetail.value.status = codeDetail.value.status ? "正常" : "停用";
      codeDetail.value.description = codeDetail.value.description ? codeDetail.value.description : "无";
      console.log(codeDetail.value);
    }
  });
</script>