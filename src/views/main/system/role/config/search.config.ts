import { IFrom } from "@/components/base-ui/from";

export const searchFromConfig: IFrom = {
  fromItems: [
    {
      field: "id",
      placeholder: "请输入用户名",
      type: "input",
      label: "用户名"
    },
    {
      field: "intro",
      label: "权限介绍",
      type: "input"
    },
    {
      field: "createTime",
      label: "创建时间",
      type: "datepicker",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      }
    }

  ]

};
