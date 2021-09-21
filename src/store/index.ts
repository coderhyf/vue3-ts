import { createStore, Store , useStore as useVuexStore} from "vuex";
import { IRootState, IStoreType } from "./types";
import login from "./login/login";

const store = createStore<IRootState>({
    state: {
      name: "coderwhy",
      age: 18
    },
    mutations: {},
    actions: {},
    modules: {
      login
    }
  }
);
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // store.dispatch('getInitialDataAction')
}
export  function userStore(): Store<IStoreType>{
  return  useVuexStore()
}

export default store;
