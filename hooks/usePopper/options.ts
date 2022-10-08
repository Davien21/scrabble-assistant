import { OptionsGeneric } from "@popperjs/core";

type IOptions = Partial<
  OptionsGeneric<{ name: string; options: { offset: number[] } }>
>;

export const PopperOptions = {
  "header-options": {
    placement: "left",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [25, 30],
        },
      },
    ],
  } as IOptions,
  bottom: {
    placement: "bottom",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 4],
        },
      },
    ],
  } as IOptions,
  top: {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 4],
        },
      },
    ],
  } as IOptions,
  "right-start": {
    placement: "right-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 5],
        },
      },
    ],
  } as IOptions,
};
