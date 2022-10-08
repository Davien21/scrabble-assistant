function formatFileSize(size: number): string {
  if (size < 1000) return `${size} bytes`;
  if (size >= 1000 && size < 1000000) return `${(size / 1000).toFixed(2)} kb`;
  if (size >= 1000000) return `${(size / 1000000).toFixed(2)} mb`;
  return "...";
}

export { formatFileSize };
