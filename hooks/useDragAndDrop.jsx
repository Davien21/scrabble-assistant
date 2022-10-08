import { useState } from "react";

export function useDragAndDrop() {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [fileDropError, setFileDropError] = useState("");

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const onDragLeave = () => setIsDraggingOver(false);

  return {
    isDraggingOver,
    setIsDraggingOver,
    onDragOver,
    onDragLeave,
    fileDropError,
    setFileDropError,
  };
}
