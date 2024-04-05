import { useState, useEffect } from "react";

export const useMarkDown = (filename) => {
  const [data, setData] = useState("");

  useEffect(() => {
    const readMarkdownFile = async () => {
      try {
        const response = await fetch(filename);
        const text = await response.text();
        setData(text);
      } catch (error) {
        console.error("Error reading Markdown file:", error);
      }
    };

    readMarkdownFile();
  }, []);

  return { data };
};
