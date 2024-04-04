import { useState, useEffect } from "react";

export const useMarkDown = (filename) => {
  const [data, setData] = useState("");

  useEffect(() => {
    const readMarkdownFile = async () => {
      try {
        const markdownModule = await import("./home.md"); // Import Markdown content
        const file = markdownModule.default;
        const response = await fetch(file);
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
