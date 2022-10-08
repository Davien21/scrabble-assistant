import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "components";
import { toast } from "react-toastify";
import { capitalize } from "utils";
import { addPlayer, removePlayer } from "store/slices/gameSlice";
import { useDispatch, useSelector, useStore } from "react-redux";
import { useRouter } from "next/router";

export default function Index() {
  const dispatch = useDispatch();
  const router = useRouter();
  const players = useSelector((state: any) => state.game.players);
  interface IPlayer {
    playerName: string;
  }

  const validationSchema = Yup.object({
    playerName: Yup.string(),
  });

  const initialValues: IPlayer = {
    playerName: "",
  };

  const handleSubmit = (values: IPlayer) => {
    if (players.length > 3) {
      toast.error("Only 4 players allowed");
      return;
    }
    const player = capitalize(values.playerName);
    if (!player || players.includes(player)) return;
    dispatch(addPlayer(player));
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const continueLastGame = () => {
    if (players.length > 1) return router.push("/play");
    toast.error("You have no existing game");
  };

  return (
    <main>
      <section>
        <div className="container mt-10 mb-5">
          <h1 className="text-3xl mb-1">Scrabble Assistant</h1>
          <div className="text-sm font-light flex flex-wrap gap-x-1">
            <span>Add at least 2 players to get started or </span>
            <span onClick={continueLastGame} className="link-text">
              Continue last game?
            </span>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-3 lg:flex gap-3 mb-10 max-w-[500px]"
          >
            <Input
              placeholder="Type in any name"
              name="playerName"
              formik={formik}
              className="sm:col-span-2"
            />
            <Button className="sm:col-span-1" type="submit">
              Add Player
            </Button>
          </form>
        </div>
      </section>
      <section>
        <div className="container">
          {!!!players.length && <p>You have not added any players yet.</p>}
          {!!players.length && (
            <div className="max-w-[400px]">
              <div className="mb-1">
                <span className="underline underline-offset-2">
                  List of Players:
                </span>
              </div>
              {players.map((player: string, index: number) => {
                let className =
                  "border-b grid grid-cols-9 gap-x-2 py-2 items-center";
                if (index === players.length - 1)
                  className.replace("border-b", "");
                return (
                  <div className={className}>
                    <span className="col-span-1">{index + 1}.</span>
                    <span className="col-span-6">{player}</span>
                    <Button
                      onClick={() => dispatch(removePlayer(player))}
                      secondary
                      className="col-span-2"
                    >
                      <span className="text-xs">Remove</span>
                    </Button>
                  </div>
                );
              })}
              <div className="grid grid-cols-1 mt-4">
                <Button
                  disabled={players.length < 2}
                  onClick={() => router.push("/play")}
                  className="w-full"
                  type="submit"
                >
                  Start Game
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
