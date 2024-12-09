<template>
  <div class="relative w-full h-full">
    <quit-new-modal ref="quitModalRef" :quit-path="{path:'/main/equity-code/detail',query: {id: id}}" />
    <div class="inline-block cursor-pointer" @click="onQuit">
      <el-icon>
        <arrow-left-bold />
      </el-icon>
    </div>
    <div class="inline-block font-bold text-lg ml-2">
      退出编辑
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
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 25%;">
          权益码
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          状态
        </div>
        <div class="flex w-full justify-center items-center" style="height: 20%;">
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
          <el-select
            v-model="codeDetail.feedback_type"
            plafeholder="请选择反馈类型"
            size="large"
            style="width: 300px;"
          >
            <el-option
              v-for="item in feedbackType"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          <el-select
            v-model="codeDetail.college.id"
            placeholder="请选择责任部门"
            size="large"
            style="width: 300px;"
          >
            <el-option
              v-for="item in collegeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          <el-input
            v-model="codeDetail.department"
            size="large"
            placeholder="请输入负责单位"
            style="width: 300px;"
          />
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          <el-input
            v-model="codeDetail.location"
            size="large"
            placeholder="请输入负责单位"
            style="width: 300px;"
          />
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 25%;">
          123
        </div>
        <div class="flex w-full justify-center items-center border-b-2 border-gray-200" style="height: 6.67%;">
          <el-radio-group v-model="codeDetail.status">
            <el-radio :value="true" size="large">
              正常
            </el-radio>
            <el-radio :value="false" size="large">
              停用
            </el-radio>
          </el-radio-group>
        </div>
        <div class="flex w-full justify-center items-center overflow-y-auto" style="height: 20%;">
          <el-input
            v-model="codeDetail.description"
            style="width: 300px;resize: none;"
            :autosize="{ minRows: 2, maxRows: 5 }"
            type="textarea"
            placeholder="请输入备注"
          />
        </div>
      </div>
    </div>
    <div class="absolute" style="right: 5%;">
      <el-button
        size="large"
        type="primary"
        style="width: 120px;"
        @click="onSave"
      >
        保存
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ArrowLeftBold } from "@element-plus/icons-vue";
import router from "@/router";
import { getCodeDetail, editEquityCode } from "@/apis/EquityCode";
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { feedbackType } from "../selectOptions";
import { QuitNewModal } from "@/components";
import useGetCollege from "@/hooks/useGetColledge";

// 获取学院列表

const collegeListHook = useGetCollege();

const collegeList = ref<any>(null);

watch(collegeListHook, (newVal) => {
  collegeList.value = newVal.data.data.college_list;
});

// 退出
const isSaved = ref<boolean>(true);
const quitModalRef = ref();

const onQuit = () => {
  if (isSaved.value) {
    router.push({ path: "/main/equity-code/detail", query: { id: id } });
  } else {
    quitModalRef.value.onOpen();
  }
};

// 获取页面详情
const id = Number(useRoute().query.id);
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
      console.log(codeDetail.value);
    }
  });

watch(codeDetail, (newVal, oldVal) => {
  if (oldVal) {
    isSaved.value = false;
  }
}, { deep: true });

const onSave = async () => {
  if (isSaved.value) {
    ElMessage.error("没有选项发生变化");
  } else {
    const saveResponse = await editEquityCode({
      id: codeDetail.value.id,
      feedback_type: codeDetail.value.feedback_type,
      college: codeDetail.value.college.id,
      department: codeDetail.value.department,
      location: codeDetail.value.location,
      description: codeDetail.value.description
    });

    if (!saveResponse.status) {
      ElMessage.error("网络错误");
    } else if (saveResponse.data.code !== 200) {
      ElMessage.error(saveResponse.data.msg);
    } else {
      ElMessage.success("保存成功");
      isSaved.value = true;
    }
  }
};
</script>