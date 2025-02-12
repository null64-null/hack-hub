import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DebateResult } from "@/app/type/debate";

interface DebateState {
  motion: string;
  limit: number;
  process: string;
  result: DebateResult;
}

const initialState: DebateState = {
  motion: "",
  limit: 300,
  process: "before",
  result: {} as DebateResult,
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
    setResult: (state, action: PayloadAction<DebateResult>) => {
      state.result = action.payload;
    },
  },
});

export const { setMotion, setLimit, setProcess, setResult } =
  debateSlice.actions;
export default debateSlice.reducer;
