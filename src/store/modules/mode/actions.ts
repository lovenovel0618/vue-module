import type { State } from "./state";
import type { Actions } from "./actions-type";

export default (state: State): Actions => {
  return {
    setItem: (item: string) => {
      state.item = item;
    },
    addItems: (item: string) => {
      state.items.push(item);
    },
  };
};
