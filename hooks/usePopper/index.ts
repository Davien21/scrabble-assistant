import { createPopper, OptionsGeneric } from "@popperjs/core";
import { RefObject, useEffect } from "react";
import { PopperOptions } from "./options";

type IOptions = Partial<
  OptionsGeneric<{ name: string; options: { offset: number[] } }>
>;

export function usePopper(
  referenceElementRef: RefObject<HTMLElement>,
  popperRef: RefObject<HTMLElement>,
  options:
    | "top"
    | "bottom"
    | "right-start"
    | "header-options"
    | IOptions = "bottom"
) {
  let placement =
    typeof options !== "string" ? options : PopperOptions[options];

  useEffect(() => {
    if (
      window &&
      document &&
      referenceElementRef.current &&
      popperRef.current
    ) {
      createPopper(referenceElementRef.current, popperRef.current, placement);
    }
  });
  return true;
}
