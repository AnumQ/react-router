import "./App.css";
import home from "./home.md";
import ReactMarkdown from "react-markdown";
import { useMarkDown } from "./useMarkDown";
function Home() {
  const { data } = useMarkDown(home);

  return (
    <div className="container">
      <ReactMarkdown>{data}</ReactMarkdown>
    </div>
  );
}

export default Home;
