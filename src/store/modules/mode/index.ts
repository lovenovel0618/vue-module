import { defineStore, acceptHMRUpdate } from "pinia";
import type { StoreDefinition } from "pinia";
import { store } from "@/store";

import state from "./state";
import type { State } from "./state";

import getters from "./getters";
import type { Getters } from "./getters";

import actions from "./actions";
import type { Actions } from "./actions-type";

export type ModeStore = StoreDefinition<string, State, Getters, Actions>;

export const useStore: ModeStore = defineStore({
  id: "mode", // TODO: 必須修改
  state: (): State => state,
  getters: getters(state),
  actions: actions(state),
});

// Need to be used outside the setup
export const modeStore = () => useStore(store);

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot));
