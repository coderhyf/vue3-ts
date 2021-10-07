<template>
  <div class="user">
    <!--  查询区  -->
    <PageSearch :searchFromConfig="searchFromConfig"
                @resetBtnClick="resetBtnClick"
                @queryBtnClick="queryBtnClick" />
    <!--  表单  -->
    <PageContent :contentConfig="contentConfig"
                 pageName="users" ref="pageContentRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// 表单配置项
import { searchFromConfig } from "./config/search.config";
import { contentConfig } from "./config/content.config";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";

import { userPageSearch } from "@/hooks/user-page-search";

export default defineComponent({
  name: "users",
  components: { PageContent, PageSearch },
  setup() {
    // const [pageContentRef, resetBtnClick, queryBtnClick] = userPageSearch();
    var pageContentRef: any = ref<InstanceType<typeof pageContentRef>>();
    const resetBtnClick = () => {
      pageContentRef.value?.getPageData();
    };
    const queryBtnClick = (queryInfo: any) => {
      pageContentRef.value?.getPageData(queryInfo);
    };
    return {
      contentConfig,
      searchFromConfig,
      pageContentRef,
      resetBtnClick,
      queryBtnClick
    };
  }
});
</script>

<style scoped lang="less">

</style>
