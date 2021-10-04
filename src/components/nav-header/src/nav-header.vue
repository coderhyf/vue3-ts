<template>
  <div class="nav-header">
    <i class="fold-menu" @click="handleIconClick"
       :class="isFold ? ' el-icon-s-fold' : 'el-icon-s-unfold'" />
    <!--  面包屑  -->
    <div class="content">
      <breadcrumb :breadcrumb="breadcrumb" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from "vue";
import Breadcrumb, { IBreadcrumb } from "@/components/breadcrumb";
import { mapToBreadcrumb } from "@/utils/map-menus";
import { userStore } from "@/store";
import { useRoute } from "vue-router";

export default {
  components: { Breadcrumb },
  emits: ["foldChange"],
  setup(props: any, { emit }: any) {
    const isFold = ref(false);
    const handleIconClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };
    // 面包屑数据 [{name: '', path :''}]
    const store = userStore();
    const breadcrumb = computed(() => {
      const useMenu = store.state.login.userMenus;
      const route = useRoute();
      const currentPath = route.path;
      return mapToBreadcrumb(useMenu, currentPath);
    });
    return {
      handleIconClick,
      isFold,
      breadcrumb
    };
  }
};
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
