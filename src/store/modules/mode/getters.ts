import type { _GettersTree } from "pinia";
import type { State } from "./state";

export type Getters = _GettersTree<State> & {
  getItem: () => string;
  getItems: () => string[];
};

export default (state: State): Getters => {
  return {
    getItem: (): string => {
      return state.item;
    },
    getItems: (): string[] => {
      return state.items;
    },
  };
};
