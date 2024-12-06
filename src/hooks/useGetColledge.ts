import { ref, onBeforeMount } from "vue";
import { getColledgeList } from "@/apis/Colleges";
import { ElMessage } from "element-plus";

const useGetCollege = () => {
  const colledgeList = ref<any>(null);
  onBeforeMount(async () => {
    colledgeList.value = await getColledgeList();
    // console.log(colledgeList.value.data);
    if (colledgeList.value.status === false) {
      ElMessage.error("网络错误, 获取学院列表失败");
    } else if (colledgeList.value.data.code !== 200) {
      ElMessage.error(colledgeList.value.data.msg);
    }
    return colledgeList;
  });

  return colledgeList;
};

export default useGetCollege;