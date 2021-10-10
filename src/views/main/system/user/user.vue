<template>
  <div class="user">
    <!--  查询区  -->
    <page-search :searchFromConfig="searchFromConfig"
                 @resetBtnClick="resetBtnClick"
                 @queryBtnClick="queryBtnClick" />
    <!--  表单  -->
    <page-content :contentConfig="contentConfig"
                  @editBtnClick="editBtnClick"
                  @newBtnClick="newBtnClick"
                  pageName="users"
                  ref="pageContentRef">
      <template #enable="{row}">
        <el-tag>{{ row.enable ? "启用" : "禁用" }}</el-tag>
      </template>
    </page-content>
    <!--  弹框  -->
    <page-modal :modal-config="modalConfig" ref="pageModalRef"
                :defaultInfo="defaultInfo" pageName="users" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// 表单配置项
import { searchFromConfig } from "./config/search.config";
import { contentConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "@/components/page-modal";
import { userPageSearch } from "@/hooks/user-page-search";
import { userPageModal } from "@/hooks/user-modal";

export default defineComponent({
  name: "users",
  components: { PageContent, PageSearch, PageModal },
  setup() {
    const [pageContentRef, resetBtnClick, queryBtnClick] = userPageSearch();
    const newCallback = () => {
      const passwordItem = modalConfig.fromItems.find(item => item.field === 'password');
      passwordItem!.isHidden = false;
     };
    const editCallback = () => {
      const passwordItem = modalConfig.fromItems.find(item => item.field === 'password');
       passwordItem!.isHidden = true;
     };
    const [pageModalRef, defaultInfo, newBtnClick, editBtnClick] = userPageModal(newCallback, editCallback);
    // const pageModalRef: any = ref<InstanceType<typeof PageModal>>();
    //  const defaultInfo = ref({});
    // const newBtnClick = () => {
    //   defaultInfo.value = {};
    //   pageModalRef.value!.centerVisible = true;
    // };
    // const editBtnClick = (item: any) => {
    //   defaultInfo.value = { ...item }
    //   pageModalRef.value!.centerVisible = true;
    // };

    return {
      contentConfig,
      searchFromConfig,
      modalConfig,
      pageContentRef,
      pageModalRef,
      defaultInfo,
      resetBtnClick,
      queryBtnClick,
      newBtnClick,
      editBtnClick
    };
  }
});
</script>
