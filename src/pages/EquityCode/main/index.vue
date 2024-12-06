<template>
  <div class="relative h-full">
    <div class="absolute font-bold text-xl left-4 top-4">
      权益码管理
    </div>
    <div class="absolute left-16 top-3 transform translate-x-1/2">
      <el-input v-model="searchContent" style="width:400px;" type="primary">
        <template #append>
          <el-button>
            搜索
          </el-button>
        </template>
      </el-input>
    </div>
    <div class="absolute top-3 right-10">
      <el-button @click="() => router.push('/main/equity-code/new')">
        新建权益码
      </el-button>
    </div>
    <div class="absolute top-16 w-full bg-gray-100" style="height: 200px;">
      <div class="relative h-full w-full">
        <div class="absolute top-8 left-10">
          <div class="font-bold text-md inline-block">
            责任部门
          </div>
          <div class="inline-block ml-5">
            <el-select
              v-model="selectedDepartment"
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
        </div>
        <div class="absolute bottom-12 left-10">
          <div class="font-bold text-md inline-block">
            反馈类型
          </div>
          <div class="inline-block ml-5">
            <el-select
              v-model="selectedType"
              placeholder="请选择反馈类型"
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
        </div>
        <div class="absolute right-1/2 top-7">
          <el-checkbox v-model="isNormalOnly" size="large" class="inline-block" />
          <div class="ml-1 font-bold texl-md inline-block">
            只看正常状态的
          </div>
        </div>
        <div class="absolute w-1 h-full bg-gray-300 right-48" />
        <div class="right-0 w-48 h-full absolute">
          <div class="relative h-full w-full">
            <div class="absolute left-1/2 transform -translate-x-1/2 top-8">
              <el-button style="width: 100px;" size="large">
                查询
              </el-button>
            </div>
            <div class="absolute left-1/2 transform -translate-x-1/2 bottom-12">
              <el-button style="width: 100px;" size="large" @click="onReset">
                重置
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ref, watch } from "vue";

import { feedbackType } from "../selectOptions";

import useGetCollege from "@/hooks/useGetColledge";

// 获取学院列表

const collegeListHook = useGetCollege();

const collegeList = ref<any>(null);

watch(collegeListHook, (newVal) => {
  collegeList.value = newVal.data.data.college_list;
  console.log(collegeList.value);
});

const selectedDepartment = ref<number | null>(null);
const selectedType = ref<number | null>(null);
const isNormalOnly = ref<boolean>(false);

const onReset = () => {
  selectedDepartment.value = null;
  selectedType.value = null;
  isNormalOnly.value = false;
};

const searchContent = ref<string>("");
</script>

<style scoped>
</style>