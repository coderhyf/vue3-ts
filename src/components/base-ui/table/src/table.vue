<template>
  <div>
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="listData" style="width: 100%" border>
      <el-table-column v-if="showIndex" type="selection" align="center" width="60" />
      <el-table-column v-if="showIndex" type="index" label="序号" align="center" width="80"
                       :index="tableIndex" />
      <template v-for="item in propList" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[5, 10, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount" />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "tables",
  props: {
    title: {
      type: String,
      default: ""
    },
    listData: {
      type: Array,
      required: true
    },
    dataCount: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 })
    },
    propList: {
      type: Array,
      required: true
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ["selectChange", "update:page"],
  setup(props: any, { emit }: any) {
    const handleSizeChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize });
    };
    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage });
    };
    const tableIndex = (index: number) => {
       return (props.page.currentPage - 1) * props.page.pageSize + index + 1;
    };

    return {
      handleSizeChange,
      handleCurrentChange,
      tableIndex
    };
  }
};
</script>
<style scoped lang="less">
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
