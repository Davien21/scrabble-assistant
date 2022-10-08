import React from "react";
import styles from "./segmentedControl.module.css";
import { motion } from "framer-motion";

function SegmentedControl({
  active,
  controls,
  onSetActiveControl,
}: {
  active: string;
  controls: string[];
  onSetActiveControl: (value: string) => void;
}) {
  const sliderWidth = Math.floor((1 / controls.length) * 100) + "%";
  const sliderLeftPosition = (() => {
    const activeIndex = controls.indexOf(active);
    return Math.round((activeIndex / controls.length) * 100) + "%";
  })();

  const controlClasses = (control: string) =>
    control == active ? `${styles.active}` : "";

  return (
    <ul
      className={styles.container}
      style={{ width: `${controls.length * 150}px`
     }}
    >
      <div className={styles["slider-container"]}>
        <motion.div
          initial={{ left: 0, width: sliderWidth }}
          animate={{ left: sliderLeftPosition }}
          className={styles.slider}
        ></motion.div>
      </div>
      {controls.map((control) => (
        <li
          onClick={() => onSetActiveControl(control)}
          key={control}
          className={controlClasses(control)}
        >
          <span className="text-sm">{control}</span>
        </li>
      ))}
    </ul>
  );
}

export { SegmentedControl };
