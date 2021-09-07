<template>
  <div>
    <el-form label-width="50" :model="userInfo" :rules="rules" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="userInfo.name" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userInfo.password" placeholder="请输入密码" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";

// 验证
import { ElForm } from "element-plus";
import { rules } from "@/rules/account-config";

// 工具
import LocalCache from "@/utils/csche";
import { messageState } from "@/message";

export default defineComponent({
  setup() {
    const store = useStore();
    const userInfo = reactive({
      name: LocalCache.getCache("name") ?? "",
      password: LocalCache.getCache("password") ?? ""
    });
    const formRef = ref<InstanceType<typeof ElForm>>();
    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            LocalCache.setCache("name", userInfo.name, true);
            LocalCache.setCache("password", userInfo.password, true);
          } else {
            LocalCache.deleteCache("name");
            LocalCache.deleteCache("password");
          }
          // 开始登录验证
          store.dispatch("login/userInfoAccount", { ...userInfo });
          messageState("success", "登录成功～");
        }
      });
    };
    return {
      loginAction,
      userInfo,
      formRef,
      rules
    };
  }
});
</script>

<style lang="less" scoped>

</style>
