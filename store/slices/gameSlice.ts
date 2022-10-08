import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IGameData, IResult } from "interfaces";
import { capitalize } from "utils";

const initialState: IGameData = {
  players: [],
  results: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<string>) => {
      const player = capitalize(action.payload);
      if (state.players.includes(player)) return;
      state.players.push(player);
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter(
        (player) => player !== action.payload
      );
    },
    addResult(state, action: PayloadAction<IResult>) {
      state.results.push(action.payload);
    },
    resetGame: (state) => {
      state.players = [];
      state.results = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPlayer, removePlayer, addResult, resetGame } =
  gameSlice.actions;

export default gameSlice.reducer;
