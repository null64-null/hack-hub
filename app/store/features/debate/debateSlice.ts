import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DebateState {
  motion: string;
  limit: string;
}

const initialState: DebateState = {
  motion: "",
  limit: "",
};

export const debateSlice = createSlice({
  name: "debate",
  initialState,
  reducers: {
    setMotion: (state, action: PayloadAction<string>) => {
      state.motion = action.payload;
    },
    setLimit: (state, action: PayloadAction<string>) => {
      state.limit = action.payload;
    },
  },
});

export const { setMotion, setLimit } = debateSlice.actions;
export default debateSlice.reducer;
