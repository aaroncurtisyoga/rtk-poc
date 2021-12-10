import { createAction, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { AppThunk } from "../../../app/store";
import { selectCount } from "./selectors";
import { fetchCount } from "../counterAPI";

// The createAction helper takes an action type and returns an action creator for that type
export const increment = createAction("counter/increment");

export const decrement = createAction("counter/decrement");

/* Todo / Discuss: By default, the generated action creators accept a single argument, which becomes action.payload.*/
export const incrementByAmount = createAction<number>(
  "counter/incrementByAmount"
);

/* Todo / Discuss: If you  want to write additional logic to customize the creation of the payload value...*/
export const incrementByAmountWithUid = createAction(
  "counter/incrementByAmount",
  function prepare(text: string) {
    return {
      payload: {
        text,
        id: nanoid(),
        createdAt: new Date().toISOString(),
      },
    };
  }
);

/* Todo / Discuss
    Thunk written by hand, which may contain both sync and async logic.
    Here's an example of conditionally dispatching actions based on current state.
    */
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

/* Todo / Discuss
    The function below is called a thunk and allows us to perform async logic. It
    can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    will call the thunk with the `dispatch` function as the first argument. Async
    code can then be executed and other actions can be dispatched. Thunks are
    typically used to make async requests.
    */
export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
