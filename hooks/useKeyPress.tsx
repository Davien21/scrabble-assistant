import { useState } from "react";
import { useEventListener } from "usehooks-ts";

export function useKeypress(key: string, action: () => void) {
  const [isPressed, setisPressed] = useState<boolean>(false);
  function onKeyup(e: KeyboardEvent) {
    if (e.key !== key) return;
    setisPressed(true);
    action();
  }
  useEventListener("keydown", onKeyup);
  useEventListener("keyup", () => setisPressed(false));
  return isPressed;
}
