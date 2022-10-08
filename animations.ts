export const arrowVariants = {
  open: { rotate: 0 },
  closed: { rotate: 180 },
};

export const menuVariants = {
  enter: {
    opacity: 1,
    y: 0,
    display: "block",
  },
  exit: {
    y: -50,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export const dropDownVariants = {
  enter: {
    opacity: 1,
    top: 50,
    display: "block",
  },
  exit: {
    top: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export const ModalParentVariants = {
  enter: {
    opacity: 1,
    transition: {
      duration: 0.1,
    },
    display: "block",
  },
  exit: { opacity: 0, transitionEnd: { display: "none" } },
};

export const accordionVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transitionEnd: { display: "block" },
  },
  closed: {
    opacity: 0,
    height: 0,
    transitionEnd: { display: "none" },
  },
};

export const PanelVariants = {
  shrink: {
    padding: "10px",
  },
  grow: {
    padding: "70px",
  },
};
