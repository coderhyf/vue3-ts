import { ElMessage } from "element-plus";

export const messageState = (type: any, message: string) => {
  ElMessage({
    message,
    type
  });
};
