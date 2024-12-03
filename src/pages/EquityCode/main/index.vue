<template>
  <div class="relative h-full">
    <div class="absolute font-bold text-xl left-4 top-4">
      权益码管理
    </div>
    <div class="absolute left-16 top-3 transform translate-x-1/2">
      <el-input style="width:400px;" type="primary">
        <template #append>
          <el-button>
            搜索
          </el-button>
        </template>
      </el-input>
    </div>
    <div class="absolute top-3 right-10">
      <el-button>
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
            <el-select size="large" style="width: 300px;" />
          </div>
        </div>
        <div class="absolute bottom-12 left-10">
          <div class="font-bold text-md inline-block">
            反馈类型
          </div>
          <div class="inline-block ml-5">
            <el-select size="large" style="width: 300px;" />
          </div>
        </div>
        <div class="absolute right-1/2 top-7">
          <el-checkbox size="large" class="inline-block" />
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
              <el-button style="width: 100px;" size="large">
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
</script>

<style scoped>
</style>