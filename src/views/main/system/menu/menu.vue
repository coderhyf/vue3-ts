<template>
  <div class="menu">
    <page-content :content-config="contentTableConfig" page-name="menu"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { contentTableConfig } from "./config/content.config";

import PageContent from "@/components/page-content";

export default defineComponent({
  name: "menu",
  components: { PageContent },
  setup() {
    return {
      contentTableConfig
    };
  }
});
</script>

<style scoped></style>
