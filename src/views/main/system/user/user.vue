<template>
  <div class="user">
    <HyfFrom v-bind="searchFromConfig" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// 表单配置项
import { searchFromConfig } from "./config/search.config";

import HyfFrom from "@/components/base-ui";

export default defineComponent({
  name: "user",
  components: {
    HyfFrom
  },
  setup() {

    return {
      searchFromConfig
    };
  }
});
</script>

<style scoped></style>
