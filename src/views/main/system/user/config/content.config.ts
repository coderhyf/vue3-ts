export const contentConfig = {
  title: "系统管理",
  propList: [
    { prop: "name", label: "用户名", minWidth: 100 },
    { prop: "realname", label: "真实姓名", minWidth: 100 },
    { prop: "cellphone", label: "联系方式", minWidth: 100 },
    { prop: "enable", label: "状态", minWidth: 100, slotName: "enable" },
    { prop: "createAt", label: "创建时间", minWidth: 180, slotName: "createAt" },
    { prop: "updateAt", label: "更新时间", minWidth: 180, slotName: "updateAt" },
    { label: "操作", minWidth: 150, slotName: "handle" }
  ],
  showIndex: true
};
