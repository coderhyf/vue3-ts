import { userStore } from "@/store";

export function userPermissions(pageName: string, handle: string) {
  const store = userStore();
  const permissions = store.state.login.permission;
  const verifyPermission = `system:${pageName}:${handle}`;
  return !!permissions.find(item => item === verifyPermission);
}
