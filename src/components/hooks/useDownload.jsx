import { useCallback } from "react";
const FILE_URL = "http://localhost:8000/storage/";

export default function useDownload() {
  const download = useCallback(async (object) => {
    try {
      const response = await fetch(FILE_URL.concat(object?.file));
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "filename"); // Set suggested filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the blob URL
    } catch (e) {
      console.log(e);
    }
  });

  return download;
}