import { ref } from "vue";
import PageModal from "@/components/page-modal";

type CallbackFn = (item?: any) => void

export function userPageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  // @ts-ignore
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  const defaultInfo = ref({});
  const newBtnClick = () => {
    defaultInfo.value = {};
    pageModalRef.value!.centerVisible = true;
    newCb && newCb()
  };
  const editBtnClick = (item: any) => {
    defaultInfo.value = { ...item };
    pageModalRef.value!.centerVisible = true;
    editCb && editCb(item)
  };
  return [pageModalRef, defaultInfo, newBtnClick, editBtnClick];
}
