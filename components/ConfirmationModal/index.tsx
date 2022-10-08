import React, { useEffect, useRef, useState } from "react";
import Emitter from "services/emitter";
import styles from "./confirmation-modal.module.css";

import { CloseIcon, DangerIcon } from "assets/images";

import { Button } from "components";
import { motion } from "framer-motion";
import { ModalParentVariants } from "animations";

import { useModal } from "hooks";

interface IConfirmArgs {
  message: string;
  onConfirmed: () => void;
}

export function ConfirmationModal() {
  const [isOpen, setisOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [onConfirmed, setonConfirmed] = useState<Function>(() => () => {});
  const [message, setmessage] = useState<string>(
    "Are you sure you want to delete this item?"
  );
  const closeModal = () => {
    setisOpen(false);
    setonConfirmed(() => () => {});
  };

  useEffect(() => {
    Emitter.on("OPEN_CONFIRM", (params: IConfirmArgs) => {
      const { message, onConfirmed } = params;
      setisOpen(true);
      setmessage(message);
      setonConfirmed(() => onConfirmed);
    });
    Emitter.on("CLOSE_CONFIRM", () => setisOpen(false));

    return () => {
      Emitter.off("OPEN_CONFIRM", () => setisOpen(false));
      Emitter.off("CLOSE_CONFIRM", () => setisOpen(false));
    };
  }, []);

  useModal(isOpen, modalRef, closeModal);
  return (
    <motion.div
      initial={{ opacity: 0, display: "none" }}
      animate={isOpen ? "enter" : "exit"}
      variants={ModalParentVariants}
      exit={{ opacity: 0, transition: { when: "afterChildren" } }}
      className={`${styles["container"]}`}
      onClick={closeModal}
    >
      <motion.div
        initial={{ y: "-100%" }}
        animate={isOpen ? { y: `100px` } : { y: "-100%" }}
        exit={{ y: "-100%" }}
        ref={modalRef}
        className={`${styles["modal-body"]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-end">
            <motion.span
              className="cursor-pointer"
              whileHover={{ scale: 1.2 }}
              onClick={closeModal}
            >
              <CloseIcon className="scale-85" />
            </motion.span>
          </div>
          <div className="flex justify-center">
            <DangerIcon />
          </div>
          <div className="py-5">
            <p className="text-center text-lg font-normal text-gray-500">
              {message}
            </p>
          </div>
          <div className="flex justify-center gap-x-3">
            <button
              onClick={() => {
                onConfirmed();
                closeModal();
              }}
              className={`${styles["primary"]} px-4 py-2`}
            >
              Yes, please
            </button>
            <button
              onClick={closeModal}
              className={`${styles["secondary"]} px-4 py-2`}
            >
              No, cancel
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
