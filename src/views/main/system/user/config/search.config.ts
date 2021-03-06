import { IFrom } from "@/components/base-ui/from";

export const searchFromConfig: IFrom = {
  fromItems: [
    {
      field: "name",
      placeholder: "请输入用户名",
      type: "input",
      label: "用户名"
    },
    {
      field: "createAt",
      label: "创建时间",
      type: "datepicker",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      }
    },
    {
      field: "enable",
      label: "用户状态",
      type: "select",
      placeholder: "请选择",
      options: [
        { title: "启用", value: 1 },
        { title: "禁用", value: 0 }
      ]
    }
  ]

};
