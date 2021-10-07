<template>
  <div class="role">
    <PageSearch :searchFromConfig="searchFromConfig" />
    <PageContent :contentConfig="contentTableConfig" pageName="role" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { searchFromConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search/src/page-search.vue";

export default defineComponent({
  name: "role",
  components: { PageSearch, PageContent },
  setup() {
    return {
      contentTableConfig,
      searchFromConfig
    };
  }
});
</script>

<style scoped></style>
