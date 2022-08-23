<template>
  <div>
    <HyfTable v-bind="contentConfig" :list-data="userList" :data-count="userCount" v-model:page="pageInfo">
      <template #headerHandler>
        <el-button size="mini" type="primary" v-if="isCreate" @click="handleNewClick">新建</el-button>
      </template>
      <template #createAt="{row}">
        {{ $filters.formatTime (row.createAt) }}
      </template>
      <template #updateAt="{row}">
        {{ $filters.formatTime (row.updateAt) }}
      </template>
      <template #handle="{row}">
        <el-button size="mini" type="primary" v-if="isUpdate"
                   @click="handleEditClick(row)">编辑
        </el-button>
        <el-button size="mini" type="danger" v-if="isDelete"
                   @click="handleDelete(row)">删除
        </el-button>
      </template>
      <!--   动态插槽   -->
      <template v-for="item in otherPropsSlots" :key="item.prop" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row" />
        </template>
      </template>
    </HyfTable>
    
  </div>
</template>

<script lang="ts">
import { computed, ref, watch } from "vue";

import { userStore } from "@/store";
import { userPermissions } from "@/hooks/use-permissions";

export default {
  name: "page-content",
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
  emits: ["newBtnClick", "editBtnClick"],
  setup(props: any, { emit }: any) {
    const store = userStore();

    // 0.获取操作的权限
    const isCreate = userPermissions(props.pageName, "create");
    const isUpdate = userPermissions(props.pageName, "update");
    const isDelete = userPermissions(props.pageName, "delete");
    const isQuery = userPermissions(props.pageName, "query");

    // 1.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 });
    watch(pageInfo, () => getPageData());
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return;
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

    // 获取动态插槽
    const otherPropsSlots = props.contentConfig?.propList.filter((item: any) => {
      if (item.slotName === "createAt") return false;
      if (item.slotName === "updateAt") return false;
      if (item.slotName === "handle") return false;
      return true;
    });
    // 删除
    const handleDelete = (item: any) => {
      store.dispatch("system/deletePageAction", {
        pageName: props.pageName,
        id: item.id
      });
    };
    // 新建
    const handleNewClick = () => {
      emit("newBtnClick");
    };
    // 编辑
    const handleEditClick = (item: any) => {
      emit("editBtnClick", item);
    };
    return {
      getPageData,
      handleDelete,
      handleNewClick,
      handleEditClick,
      otherPropsSlots,
      userList,
      userCount,
      pageInfo,
      isDelete,
      isUpdate,
      isCreate
    };
  }
};
</script>

<style scoped>

</style>
