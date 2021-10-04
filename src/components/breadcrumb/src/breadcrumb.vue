<!--面包屑-->
<template>
  <div class="nav-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumb" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path}">{{ item.name }}</el-breadcrumb-item>

      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { IBreadcrumb } from "../type";

export default {
  name: "breadcrumb",
  props: {
    breadcrumb: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  }
};
</script>

<style scoped lang="less">

</style>
