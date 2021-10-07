<template>
  <div>
    <HyfFrom v-bind="searchFromConfig" v-model="formData">
      <template #footer>
        <div class="handle-btns">
          <el-button size="mini" type="primary" @click="queryList">查 询</el-button>
          <el-button size="mini" @click="handleReset">重 置</el-button>
        </div>
      </template>
    </HyfFrom>
  </div>
</template>

<script>
import { ref } from "vue";

import HyfFrom from "../../base-ui/from";

export default {
  name: "page-search",
  props: {
    searchFromConfig: {
      type: Object,
      required: true
    }
  },
  components: { HyfFrom },
  emits: ["resetBtnClick", "queryBtnClick"],
  setup (props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定
    // 1.优化一: formData中的属性应该动态来决定
    const formItems = props.searchFromConfig?.fromItems ?? [];
    const formChangeItems = {};
    for (const item of formItems) {
      formChangeItems[item.field] = "";
    }
    const formData = ref (formChangeItems);
    // 2.优化二: 当用户点击重置
    const handleReset = () => {
      formData.value = formChangeItems;
      emit ("resetBtnClick");
    };
    // 3.优化三： 用户点击搜索
    const queryList = () => {
      emit ("queryBtnClick", formData.value);
    };
    return {
      formData,
      handleReset,
      queryList
    };
  }

};
</script>

<style scoped lang="less">
.handle-btns {
  text-align: right;
  padding-bottom: 20px;
}
</style>
