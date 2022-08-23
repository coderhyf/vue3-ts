<template>
  <div class="goods">
    <PageContent :contentConfig="contentConfig"
                 pageName="goods">
      <template #image="{ row }">
        <el-image :src="row.imgUrl"
                  style="width: 50px; height: 50px"
                  :preview-src-list="[row.imgUrl]" />
      </template>
      <template #oldPrice="{ row }">{{ " ¥ " + row.oldPrice }}</template>
      <template #status="{ row }">
        <el-tag>{{ row.status ? "哈哈" : "嘿嘿" }}</el-tag>
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { contentConfig } from "./config/content.config";
import PageContent from "@/components/page-content";

export default defineComponent({
  name: "goods",
  components: { PageContent },
  setup() {
    return {
      contentConfig
    };
  }
});
</script>

<style scoped></style>
