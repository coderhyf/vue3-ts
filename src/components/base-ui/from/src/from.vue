<template>
  <div class="yf-form">
    <el-form :labelWidth="labelWidth">
      <el-row>
        <template v-for="item in fromItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :itemStyle="itemStyle" :rules="item.rules"
                          v-if="!item.isHidden">
              <!--     input    -->
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input :placeholder="item.placeholder" :show-password="item.type === 'password'"
                          :model-value="modelValue[`${item.field}`]"
                          @update:modelValue="handleValueChange($event, item.field)" />
              </template>
              <!--     下拉框   -->
              <template v-else-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" style="width: 100%"
                           :model-value="modelValue[`${item.field}`]" clearable
                           @update:modelValue="handleValueChange($event, item.field)">
                  <el-option v-for="val in item.options" :key="val.value"
                             :value="val.value" :label="val.title" />
                </el-select>
              </template>
              <!--    日期    -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker v-bind="item.otherOptions" style="width: 100%"
                                :model-value="modelValue[`${item.field}`]"
                                @update:modelValue="handleValueChange($event, item.field)" />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from "vue";
import { IFromItems } from "../type";

export default defineComponent({
  name: "from",
  props: {
    modelValue: {
      type: Object,
      required: true
    },
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
      default: () => ({ padding: "10px 30px" })
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
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // const formData = ref({ ...props.modelValue });
    // watch(formData, (newValue) => emit("update:modelValue", newValue), { deep: true });
    const handleValueChange = (value: any, field: string) => {
      emit("update:modelValue", { ...props.modelValue, [field]: value });
    };
    return {
      // formData,
      handleValueChange
    };
  }
});
</script>

<style scoped lang="less">
.yf-form {
  padding-top: 22px;
}
</style>
