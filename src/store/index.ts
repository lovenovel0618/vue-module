import { modeStore } from "./modules/mode";
import type { ModeStore } from "./modules/mode";

export interface IAppStore {
  modeStore: ReturnType<ModeStore>;
}

const store: IAppStore = {} as IAppStore;

/**
 * 註冊app狀態庫
 */
export const registerStore = () => {
  store.modeStore = modeStore();
};

export default store;
