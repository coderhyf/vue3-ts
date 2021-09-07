// 本地存储
class LocalCache {
  setCache(key: string, value: any, localStorage: boolean) {
    if (localStorage) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getCache(key: string) {
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  }

  clearCache() {
    window.localStorage.clear();
  }
}

export default new LocalCache();
