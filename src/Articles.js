import React from "react";
import "./App.css";
import { Link } from "./Router";

// Example article data
const articles = [
  { id: 1, title: "Article 1", summary: "Summary of article 1" },
  { id: 2, title: "Article 2", summary: "Summary of article 2" },
  { id: 3, title: "Article 3", summary: "Summary of article 3" },
];

export function ArticleDetails({ id }) {
  const article = articles.find((article) => article.id === parseInt(id, 10));

  return (
    <div>
      <h1>{article?.title}</h1>
      <p>{article?.summary}</p>
    </div>
  );
}

function Articles() {
  return (
    <div className="container">
      <h1>All Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id} style={{ cursor: "pointer" }}>
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            <Link href={`/article/${article.id}`}>Read more</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Articles;
