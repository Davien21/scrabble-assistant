import { IMetaTags } from "interfaces";

export const getMeta = (tag: IMetaTags) => {
  const meta = {
    view: {
      initial: "V",
      desc: "This means the function cannot change the state of the smart contract",
    },
    public: {
      initial: "Pb",
      desc: "This means the function is accessible to all parties",
    },
    payable: {
      initial: "Pa",
      desc: "This means the function requires ether, usually as a payment",
    },
    nonpayable: {
      initial: "NPa",
      desc: "This means the function does not require ether",
    },
  };
  return meta[tag] as { initial: string; desc: string };
};