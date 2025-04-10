import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICustomer {
  value: number;
}

const initialState: ICustomer = {
  value: 0,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = customerSlice.actions;
export default customerSlice.reducer;
