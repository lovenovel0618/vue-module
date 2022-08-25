import { CreateActions } from "@/types/store";
import type { State } from "./state";

interface ActionInterface {
  setItem: (item: string) => void;
  addItems: (item: string) => void;
}

export type Actions = CreateActions<string, State, ActionInterface>;
