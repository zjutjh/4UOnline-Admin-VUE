<template>
  <div class="h-full w-full relative">
    <div class="inline-block cursor-pointer" @click="() => router.push('/main/equity-code')">
      <el-icon>
        <arrow-left-bold />
      </el-icon>
    </div>
    <div class="inline-block font-bold text-lg ml-2">
      新建权益码
    </div>
    <div class="absolute left-1/2 transform -translate-x-1/2 top-16 border-2 border-gray-200" style="width: 600px;height: 500px;">
      <div class="flex h-full w-full">
        <div class="w-1/3 inline-block">
          <div class="border-b-2 border-r-2 border-gray-200 flex items-center justify-center text-lg" style="height: 12.5%;">
            权益码编号
          </div>
          <div class="border-b-2 border-r-2 border-gray-200 flex items-center justify-center text-lg" style="height: 12.5%;">
            权益码类型
          </div>
          <div class="border-b-2 border-r-2 border-gray-200 flex items-center justify-center text-lg" style="height: 12.5%;">
            责任部门
          </div>
          <div class="border-b-2 border-r-2 border-gray-200 flex items-center justify-center text-lg" style="height: 12.5%;">
            负责单位
          </div>
          <div class="border-b-2 border-r-2 border-gray-200 flex items-center justify-center text-lg" style="height: 12.5%;">
            投放位置
          </div>
          <div class="border-r-2 border-gray-200 flex items-center justify-center text-lg" style="height: 37.5%;">
            备注
          </div>
        </div>
        <div class="w-2/3 inline-block">
          <div class="border-b-2 border-gray-200 flex items-center justify-center" style="height: 12.5%;color: blue;">
            由系统生成
          </div>
          <div class="border-b-2 border-gray-200 flex items-center justify-center" style="height: 12.5%;">
            <el-select
              v-model="selectedType"
              placeholder="请选择反馈类型"
              size="large"
              style="width: 300px;"
            >
              <el-option
                v-for="item in feedbackType"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="border-b-2 border-gray-200 flex items-center justify-center" style="height: 12.5%;">
            <el-select
              v-model="selectedDepartment"
              placeholder="请选择责任部门"
              size="large"
              style="width: 300px;"
            >
              <el-option
                v-for="item in departmentOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="border-b-2 border-gray-200 flex items-center justify-center" style="height: 12.5%;">
            <el-input
              v-model="responsibleDepartment"
              size="large"
              placeholder="请输入负责单位"
              style="width: 300px;"
            />
          </div>
          <div class="border-b-2 border-gray-200 flex items-center justify-center" style="height: 12.5%;">
            <el-input
              v-model="position"
              size="large"
              placeholder="请输入投放位置"
              style="width: 300px;"
            />
          </div>
          <div class="border-gray-200 flex items-center justify-center" style="height: 37.5%;">
            <el-input
              v-model="remark"
              style="width: 300px"
              :rows="5"
              type="textarea"
              placeholder="请输入备注"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="absolute w-full bottom-2 h-16">
      <div class="flex w-full justify-center items-center space-x-32">
        <el-button size="large" style="width: 130px;" @click="onReset">
          清空
        </el-button>
        <el-button size="large" style="width: 130px;">
          发布
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
import { ArrowLeftBold } from "@element-plus/icons-vue";
import { department as departmentOptions, feedbackType } from "../selectOptions";

const selectedType = ref<string>("");
const selectedDepartment = ref<string>("");
const responsibleDepartment = ref<string>("");
const position = ref<string>("");
const remark = ref<string>("");

const onReset = () => {
  selectedType.value = "";
  selectedDepartment.value = "";
  responsibleDepartment.value = "";
  position.value = "";
  remark.value = "";
};
</script>