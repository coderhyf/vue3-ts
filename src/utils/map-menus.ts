import { RouteRecordRaw } from "vue-router";
import { IBreadcrumb } from "@/components/breadcrumb";

let fistMenu: any = null;

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  // 1 先去加载所有的默认route
  const allRoutes: RouteRecordRaw[] = [];
  // 获取router文件中main里面所有的文件， true代表递归查找， /\.ts/代表查找的类型
  const routeFiles = require.context("../router/main", true, /\.ts/);
  // 返回值是数组
  routeFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1]);
    allRoutes.push(route.default);
  });
  // 2 根据菜单去获取要添加的route
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) routes.push(route);
        if (!fistMenu) {
          fistMenu = menu;
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };
  _recurseGetRoute(userMenus);
  return routes;
}

// 面包屑
export function mapToBreadcrumb(userMenus: any[], currentPath: string) {
  const breadcrumb: IBreadcrumb[] = [];
  pathMapToMenu(userMenus, currentPath, breadcrumb);
  return breadcrumb;
}

// 匹配刷新左侧菜单
export function pathMapToMenu(userMenus: any[], currentPath: string, breadcrumb?: IBreadcrumb[]): any {
  for (const userMenu of userMenus) {
    if (userMenu.type === 1) {
      const findMenu = pathMapToMenu(userMenu.children ?? [], currentPath);
      if (findMenu) {
        breadcrumb?.push({ name: userMenu.name, path: userMenu.url });
        breadcrumb?.push({ name: findMenu.name, path: findMenu.url });
        return findMenu;
      }
    } else if (userMenu.type === 2 && userMenu.url === currentPath) {
      return userMenu;
    }
  }
}

// 权限管理递归实现

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = [];
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if ([1, 2].includes(menu.type)) {
        _recurseGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };
  _recurseGetPermission(userMenus);
  return permissions;
}

export { fistMenu };
