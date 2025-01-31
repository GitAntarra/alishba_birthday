import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Guest } from "./guestInterface";

interface guestInitialState {
  datas: Guest[] | null;
  data: Guest | null;
  loading: boolean;
  error: boolean;
}

const initialState: guestInitialState = {
  datas: null,
  data: null,
  loading: false,
  error: false,
};

const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setGuests(state, action: PayloadAction<Guest[] | null>) {
        state.datas = action.payload;
      },
    setGuest(state, action: PayloadAction<Guest | null>) {
      state.data = action.payload;
    },
    setGuestLoad(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setGuestErr(state, action: PayloadAction<boolean>) {
      state.error = action.payload;
    },
  },
});

export const { setGuests, setGuest, setGuestLoad, setGuestErr } = guestSlice.actions;
const guestReducer = guestSlice.reducer;
export default guestReducer;
