import Emitter from "services/emitter";

interface IArgs {
  title: string;
  content: string;
  btnText: string;
  onAction: Function;
}

const action = {
  info: ({ title, content, btnText, onAction }: IArgs) => {
    const payload = { title, content, btnText, onAction, type: "info" };
    Emitter.emit("OPEN_ACTION_MODAL", payload);
  },
  success: ({ title, content, btnText, onAction }: IArgs) => {
    const payload = { title, content, btnText, onAction, type: "success" };
    Emitter.emit("OPEN_ACTION_MODAL", payload);
  },
  warning: ({ title, content, btnText, onAction }: IArgs) => {
    const payload = { title, content, btnText, onAction, type: "warning" };
    Emitter.emit("OPEN_ACTION_MODAL", payload);
  },
};

export default action;
