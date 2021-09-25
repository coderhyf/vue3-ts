import { RouteRecordRaw } from "vue-router";
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];
  // 1 先去加载所有的默认route
  const allRoutes: RouteRecordRaw[] = [];
  // 获取router文件中main里面所有的文件， true代表递归查找， /\.ts/代表查找的类型
  const routeFiles = require.context('../router/main', true, /\.ts/)
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
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };
  _recurseGetRoute(userMenus);
  return routes;
}
