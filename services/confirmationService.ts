import Emitter from "services/emitter";

const confirmation = {
  danger: (message: string, onConfirmed: Function) => {
    Emitter.emit("OPEN_CONFIRM", { message, onConfirmed });
  },
};

export default confirmation;
