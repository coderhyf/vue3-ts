<template>
  <div>
    <HyfTable v-bind="contentConfig"
              :list-data="userList"
              :data-count="userCount"
              v-model:page="pageInfo">
      <template #headerHandler>
        <el-button size="mini" type="primary">新建</el-button>
      </template>
      <template #status="{row}">
        <el-tag>{{ row.enable ? "启用" : "禁用" }}</el-tag>
      </template>
      <template #createAt="{row}">
        {{ $filters.formatTime (row.createAt) }}
      </template>
      <template #updateAt="{row}">
        {{ $filters.formatTime (row.updateAt) }}
      </template>
      <template #handle>
        <el-button size="mini" type="primary">修改</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </template>
    </HyfTable>
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue";
import { userStore } from "@/store";

import HyfTable from "@/components/base-ui/table";

export default {
  name: "page-content",
  components: { HyfTable },
  props: {
    contentConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props: any) {
    const store = userStore();
    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    watch(pageInfo, () => getPageData());
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      });
    };
    getPageData();
    const userList = computed(() => store.getters["system/pageListData"](props.pageName));
    const userCount = computed(() => store.getters["system/pageListCount"](props.pageName));

    return {
      getPageData,
      userList,
      userCount,
      pageInfo
    };
  }
};
</script>

<style scoped>

</style>
