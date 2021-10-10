<template>
  <div>
    <el-dialog v-model="centerVisible" title="新建用户" width="30%" center>
      <hyf-froms v-bind="modalConfig" v-model="fromData" />
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerVisible = false">取消</el-button>
        <el-button type="primary" @click="centerVisible = false">确定</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, watch } from "vue";
import HyfFroms from "@/components/base-ui/from";

export default {
  name: "page-modal",
  components: { HyfFroms },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props: any) {
    const centerVisible = ref(false);
    const fromData = ref<any>({});
    watch(() => props.defaultInfo, (newValue) => {
        for (const item of props.modalConfig.fromItems) {
          fromData.value[`${item.field}`] = newValue[`${item.field}`];
        }
      }
    );
    return {
      centerVisible,
      fromData
    };
  }
};
</script>

