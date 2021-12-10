import { createReducer, AnyAction, PayloadAction } from "@reduxjs/toolkit";

import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  incrementIfOdd,
} from "./actions";

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
  otherActions: number;
}

const initialState: CounterState = {
  value: 0,
  status: "idle",
  otherActions: 0,
};

export const counterReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state) => {
      state.value++;
    })
    .addCase(decrement, (state) => {
      state.value--;
    })
    .addCase(incrementByAmount, (state, action) => {
      state.value += action.payload;
    })
    .addCase(incrementAsync.pending, (state) => {
      state.status = "loading";
    })
    .addCase(incrementAsync.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.value += payload;
    })
    .addCase(incrementAsync.rejected, (state) => {
      state.status = "failed";
    })
    /*
     Todo: Discuss
      If multiple matcher reducers match, all of them will be executed in the order they were defined in -
      even if a case reducer already matched. All calls to builder.addMatcher must come after any calls to
      builder.addCase and before any calls to builder.addDefaultCase.
     */
    .addMatcher(isActionWithNumberPayload, (state, action) => {})
    /* Todo / Discuss
     *   Works like a switch statements default
     * */

    .addDefaultCase((state, action) => {
      state.otherActions++;
    });
});

function isActionWithNumberPayload(
  action: AnyAction
): action is PayloadAction<number> {
  return typeof action.payload === "number";
}
