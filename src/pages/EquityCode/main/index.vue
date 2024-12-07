<template>
  <div class="relative h-full">
    <div class="absolute font-bold text-xl left-4 top-4">
      权益码管理
    </div>
    <div class="absolute left-16 top-3 transform translate-x-1/2">
      <el-input v-model="searchContent" style="width:400px;" type="primary">
        <template #append>
          <el-button @click="onSearch">
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
        <div class="absolute top-7" style="right: 300px;">
          <el-checkbox v-model="isNormalOnly" size="large" class="inline-block" />
          <div class="ml-1 font-bold texl-md inline-block">
            只看正常状态的
          </div>
        </div>
        <div class="absolute w-1 h-full bg-gray-300 right-48" />
        <div class="right-0 w-48 h-full absolute">
          <div class="relative h-full w-full">
            <div class="absolute left-1/2 transform -translate-x-1/2 top-8">
              <el-button style="width: 100px;" size="large" @click="onSearch">
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
    <div class="absolute h-1/2 w-full" style="top: 40%;">
      <el-table
        v-if="codeList"
        :data="codeList"
        border
        style="width: 100%"
      >
        <el-table-column prop="id" label="权益码编号" width="150" />
        <el-table-column prop="created_at" label="创建日期" width="150" />
        <el-table-column prop="feedback_type" label="反馈类型" width="150" />
        <el-table-column prop="college.name" label="责任部门" width="150" />
        <el-table-column prop="department" label="负责单位" width="150" />
        <el-table-column prop="location" label="投放位置" width="150" />
        <el-table-column prop="status" label="状态信息" width="150" />
        <el-table-column
          prop="description"
          label="备注"
          width="150"
          show-overflow-tooltip
        />
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button
              link
              type="primary"
              size="small"
              @click="onToDetail(row.id)"
            >
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="absolute bottom-8 w-full h-20">
      <el-pagination
        v-if="codeList"
        v-model:current-page="currentPage"
        :page-count="totalPage"
        layout="prev, pager, next"
        class="justify justify-center"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import { ref, watch } from "vue";

import { feedbackType } from "../selectOptions";

import useGetCollege from "@/hooks/useGetColledge";

import { getCodeList } from "@/apis/EquityCode";

import { ElMessage } from "element-plus";

// 获取学院列表

const collegeListHook = useGetCollege();

const collegeList = ref<any>(null);

watch(collegeListHook, (newVal) => {
  collegeList.value = newVal.data.data.college_list;
  // console.log(collegeList.value);
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

// 获取到的列表
const codeList = ref<any>(null);
const codeListloading = ref<boolean>(false);

// 分页显示
const totalPage = ref<number>(0);
const currentPage = ref<number>(1);

// 搜索方法
const searchMethod = async () => {
  if (selectedDepartment.value === null && selectedType.value === null && searchContent.value === "") {
    ElMessage.error("请添加筛选条件");
  } else {
    const searchResponse = await getCodeList({
      keyword: searchContent.value,
      filter: {
        college: [selectedDepartment.value],
        feedback_type: [selectedType.value]
      },
      page: currentPage.value,
      page_size: 5
    });
    if (!searchResponse.status) {
      ElMessage.error("网络错误");
    } else if (searchResponse.data.code !== 200) {
      ElMessage.error(searchResponse.data.msg);
    } else {
      codeList.value = searchResponse.data.data.qrcode_list.map(
        (item: any) => ({
          ...item,
          created_at: new Date(item.created_at).toISOString().split("T")[0],
          feedback_type: feedbackType[item.feedback_type].name,
          status: item.status ? "正常" : "停用",
          description: item.description ? item.description : "无"
        })
      );
      // console.log(searchResponse.data.data.total);
      totalPage.value = Math.ceil(searchResponse.data.data.total / 5);
      // console.log(totalPage.value);
      // console.log(totalPage.value);
      // console.log(codeList.value);
    }
  }
};
// 搜索
const onSearch = async () => {
  currentPage.value = 1;
  await searchMethod();
};

// 翻页
const onTurningPage = async (page: number) => {
  currentPage.value = page;
  codeListloading.value = true;
  await searchMethod();
  codeListloading.value = false;
};

watch(currentPage, (newVal) => {
  onTurningPage(newVal);
});

const onToDetail = (id: number) => {
  router.push({
    path: "/main/equity-code/detail",
    query: {
      id: id
    }
  });
};
</script>

<style scoped>
</style>