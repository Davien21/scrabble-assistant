import { RefObject, useEffect, useState } from "react";
import { useKeypress } from "./useKeyPress";

export function useModal(
  isOpen: boolean,
  modalRef: RefObject<HTMLElement>,
  onClose?: () => void
) {
  useKeypress("Escape", onClose || (() => {}));

  const [modalHeight, setmodalHeight] = useState<number>(0);
  useEffect(() => {
    if (modalRef.current) setmodalHeight(modalRef.current.clientHeight);

    document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, modalRef]);
}
