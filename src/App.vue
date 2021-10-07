<template>
  <div class="app">
    <ElConfigProvider :locale="locale">
      <router-view />
    </ElConfigProvider>
  </div>
</template>
<script lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
export default ({
  components:{ElConfigProvider},
  setup(){
    const locale = zhCn
    return{
      locale
    }
  }
})
</script>
<style lang="less">
.app {
  height: 100%;
}
</style>
