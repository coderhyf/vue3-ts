<template>
  <div>
    <el-form label-width="60">
      <el-form-item label="手机号">
        <el-input placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="get-code">
          <el-input placeholder="请输入" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {},
  setup() {
    const state = ref("");
    return {
      state
    };
  }
});
</script>

<style lang="less" scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
