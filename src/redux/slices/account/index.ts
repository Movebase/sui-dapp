import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
  user: "",
  token: "",
};

export const accountSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { user, token } }: PayloadAction<{ user: any; token: string }>
    ) => {
      state.user = user;
      state.token = token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCredentials } = accountSlice.actions;
export default accountSlice.reducer;
