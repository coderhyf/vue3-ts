<template>
  <div class="login-panel">
    <h1 class="title">coderhyf</h1>
    <el-tabs type="border-card" stretch>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-user"></i> 账号登录</span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <LoginPhone />
      </el-tab-pane>
    </el-tabs>
    <div class="state">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">找回密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="loginSubmit">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LoginAccount from "./LoginAccount.vue";
import LoginPhone from "./LoginPhone.vue";

export default defineComponent({
  components: { LoginPhone, LoginAccount },
  setup() {
    const isKeepPassword = ref(true);
    const accountRef = ref<InstanceType<typeof LoginAccount>>();
    const loginSubmit = () => {
      accountRef.value?.loginAction(isKeepPassword.value);
    };
    return {
      isKeepPassword,
      accountRef,
      loginSubmit
    };
  }
});
</script>

<style lang="less" scoped>
.login-panel {
  width: 320px;
  margin-bottom: 150px;

  .title {
    text-align: center;
  }

  .state {
    display: flex;
    margin-top: 10px;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
