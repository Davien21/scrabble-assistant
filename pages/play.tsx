import { Button, Input, SegmentedControl } from "components";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { capitalize } from "utils";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addResult, resetGame } from "store/slices/gameSlice";
import { IResult } from "interfaces";
import { useRouter } from "next/router";
import confirmation from "services/confirmationService";

export default function Play() {
  const dispatch = useDispatch();
  const router = useRouter();
  const players = useSelector((state: any) => state.game.players);
  const results = useSelector((state: any) => state.game.results);
  const [playerIndex, setplayerIndex] = useState(0);
  const validationSchema = Yup.object({
    wordToSearch: Yup.string().required("Please input a word"),
  });

  type valuesType = {
    wordToSearch: string;
  };

  const initialValues: valuesType = {
    wordToSearch: "",
  };

  const addScorevalidationSchema = Yup.object({
    word: Yup.string(),
    score: Yup.number(),
  });

  const initialAddScoreValues: Omit<IResult, "player"> = {
    word: "",
    score: "",
  };

  const [isLoading, setisLoading] = useState(false);
  const [currentWord, setcurrentWord] = useState<string>("");
  const handleSubmit = async (values: valuesType) => {
    setisLoading(true);
    const word = values.wordToSearch.toLowerCase().trim();
    const response = await fetch(
      `https://fly.wordfinderapi.com/api/search?starts_with=${word}&ends_with=${word}&word_sorting=points&group_by_length=true&page_size=20&dictionary=wwf2&length=${word.length}`
    );
    const data = await response.json();
    setisLoading(false);
    // console.log("search", data.word_pages);
    if (data.word_pages) setcurrentWord(`${capitalize(word)} is a valid word`);
    else setcurrentWord(`${capitalize(word)} is not a valid word`);
    // setresult(data);
  };

  const handleAddScore = (values: Omit<IResult, "player">) => {
    if (!values.word && !values.score) toast.error("You missed something!");
    const player = players[playerIndex];
    let data = { ...values, player };
    dispatch(addResult(data));
    // setplayerIndex((prev: number) => prev + 1);
    console.log(results);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const addWordFormik = useFormik({
    initialValues: initialAddScoreValues,
    validationSchema: addScorevalidationSchema,
    onSubmit: handleAddScore,
  });

  const filteredResults = results.filter(
    (x: any) => x.player === players[playerIndex]
  );
  const restartGame = () => {
    const message = `Are you sure you want to reset this game?`;
    const onConfirm = () => {
      dispatch(resetGame());
      router.push("/");
    };
    confirmation.danger(message, onConfirm);
  };

  return (
    <main className="">
      <section className="container">
        <div className="mt-10 mb-5">
          <h1 className="text-3xl mb-1">Scrabble Assistant</h1>
          <div className="text-sm font-light flex flex-wrap gap-x-1">
            <span onClick={restartGame} className="link-text">
              Click to restart this game
            </span>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex gap-x-2 mt-5 items-center">
            <Input
              formik={formik}
              placeholder="Search for a word"
              className="rounded-none"
              name="wordToSearch"
            />
            <Button isLoading={isLoading} type="submit">
              Search
            </Button>
            <span>{currentWord}</span>
          </div>
          <div>{/* <p>{result}</p> */}</div>
        </form>
        <div className="flex gap-x-4 items-center mt-8">
          <h3 className="text-xl font-light">Add a new word</h3>
        </div>
        <form onSubmit={addWordFormik.handleSubmit} className="max-w-[400px]">
          <div className="flex gap-x-2 mt-3 items-center">
            <Input
              formik={addWordFormik}
              placeholder="Word?"
              className="rounded-none"
              name={"word"}
            />
            <Input
              formik={addWordFormik}
              placeholder="Score?"
              className="rounded-none"
              name={"score"}
            />
            <Button secondary type="submit">
              Play
            </Button>
          </div>
        </form>
      </section>
      <section className="container">
        <div className="max-w-[600px]">
          <div className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-between mt-12 mb-3">
            <h3 className="text-xl hidden sm:block font-light">Game results</h3>
            <div className="">
              <SegmentedControl
                active={players[playerIndex]}
                controls={players}
                onSetActiveControl={(control) =>
                  setplayerIndex(players.indexOf(control))
                }
              />
            </div>
          </div>
          {/* {!!!results.length && ""} */}
          <div id="results">
            <div className="border-b-2 grid gap-x-5 grid-cols-7">
              <div className="col-span-1 border-r">
                <span className="py-3 flex justify-center">S/N</span>
              </div>
              <div className="col-span-4 border-r">
                <span className="py-3 flex">Words</span>
              </div>
              <div className="col-span-2">
                <span className="py-3 flex">Score</span>
              </div>
            </div>
            {filteredResults.map((item: IResult, index: number) => (
              <div>
                <div className="border-b-2 grid gap-x-5 grid-cols-7">
                  <div className="col-span-1 border-r">
                    <span className="py-3 flex justify-center">
                      {index + 1}
                    </span>
                  </div>
                  <div className="col-span-4 border-r">
                    <span className="py-3 flex">{item.word}</span>
                  </div>
                  <div className="col-span-2 ">
                    <span className="py-3 flex">{item.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
