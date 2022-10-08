import { NextPage } from "next";
import { ReactElement } from "react";

export interface IResult {
  word: string;
  score: string;
  player: string;
}

export interface IGameData {
  players: string[];
  results: IResult[];
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => React.ReactNode;
};
