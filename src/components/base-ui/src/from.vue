<template>
  <div class="yf-form">
    <el-form :labelWidth="labelWidth">
      <el-row>
        <template v-for="item in fromItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :itemStyle="itemStyle" :rules="item.rules">
              <!--     input    -->
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input :placeholder="item.placeholder" :show-password="item.type === 'password'" />
              </template>
              <!--     下拉框   -->
              <template v-else-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" style="width: 100%">
                  <el-option v-for="val in item.options" :value="val.value">{{ val.title }}</el-option>
                </el-select>
              </template>
              <!--    日期    -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker v-bind="item.otherOptions"  style="width: 100%"/>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { IFromItems } from "../type";

export default defineComponent({
  name: "from",
  props: {
    fromItems: {
      type: Array as PropType<IFromItems[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: "100px"
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: "10px 40px" })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  }
});
</script>

<style scoped lang="less">
.yf-form {
  padding-top: 22px;
}
</style>
