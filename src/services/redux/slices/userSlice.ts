import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  email: string;
  role: "admin" | "user";
  name: string;
  phone: string;
  password?: string;
  createdAt: string;
}
interface UserState {
  isLoggedIn: boolean;
  user: IUser | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUser>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
