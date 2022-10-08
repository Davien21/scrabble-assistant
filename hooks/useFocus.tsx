import { Ref, RefObject, useEffect, useState } from "react";
import { useEventListener } from "usehooks-ts";

type elementTypes = HTMLInputElement | HTMLTextAreaElement;

export function useFocus<T extends elementTypes = elementTypes>(
  elementRef: RefObject<T>
): boolean {
  const [isFocused, setisFocused] = useState<boolean>(false);

  useEventListener("focus", () => setisFocused(true), elementRef);
  useEventListener("blur", () => setisFocused(false), elementRef);

  return isFocused;
}
