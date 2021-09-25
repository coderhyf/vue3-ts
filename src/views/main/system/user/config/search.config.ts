import { IFrom } from "@/components/base-ui";

export const searchFromConfig: IFrom = {
  fromItems:[
    {
      placeholder: "请输入用户名",
      type: "input",
      label: "用户名"
    },
    {
      label: "密码",
      type: "password",
      placeholder: "请输入密码"
    },
    {
      label: "密码",
      type: "password",
      placeholder: "请输入密码"
    },
    {
      label: "创建时间",
      type: "datepicker",
      otherOptions: {
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
        type: "daterange"
      }
    },
    {
      label: "喜欢的运动",
      type: "select",
      placeholder: "请选择",
      options: [
        { title: "篮球", value: "1" },
        { title: "足球", value: "2" }
      ]
    },
  ],

}
