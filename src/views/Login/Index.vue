<template>
  <div class="login">
    <LoginPanel />
 222222

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginPanel from "./cpns/LoginPanel.vue";

export default defineComponent({
  components: { LoginPanel }
});
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/login-bg.svg");
}
</style>
