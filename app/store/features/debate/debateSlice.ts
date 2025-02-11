import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DebateState {
  motion: string;
  limit: number;
  process: string;
}

const initialState: DebateState = {
  motion: "",
  limit: 300,
  process: "before",
};

export const debateSlice = createSlice({
  name: "debate",
  initialState,
  reducers: {
    setMotion: (state, action: PayloadAction<string>) => {
      state.motion = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    setProcess: (state, action: PayloadAction<string>) => {
      state.process = action.payload;
    },
  },
});

export const { setMotion, setLimit, setProcess } = debateSlice.actions;
export default debateSlice.reducer;
