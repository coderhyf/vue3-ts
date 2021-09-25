<template>
  <div class="nav-header">
    <i class="fold-menu" @click="handleIconClick"
       :class="isFold ? ' el-icon-s-fold' : 'el-icon-s-unfold'" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  emits: ["foldChange"],
  setup(props: any, { emit }: any) {
    const isFold = ref(false);
    const handleIconClick = () => {
      isFold.value = !isFold.value;
      emit("foldChange", isFold.value);
    };
    return {
      handleIconClick,
      isFold
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
