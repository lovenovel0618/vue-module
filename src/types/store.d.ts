import type {
  PiniaCustomProperties,
  _GettersTree,
  _StoreWithGetters,
  _StoreWithState,
} from "pinia";
import type { UnwrapRef } from "vue";

export type CreateActions<Id extends string, S, A> = A &
  ThisType<
    A &
      UnwrapRef<S> &
      _StoreWithState<Id, S, _GettersTree<S>, A> &
      _StoreWithGetters<_GettersTree<S>> &
      PiniaCustomProperties
  >;
