import React from "react";
import "./App.css";
import { Link } from "./Router";
import articles from "./articles.json";

export function ArticleDetails({ id }) {
  console.log(id);
  console.log(typeof id);
  const article = articles.find((article) => article.id === parseInt(id));

  return (
    <div className="container">
      <Image imageUrl={article.imageUrl}></Image>
      <h1>{article?.title}</h1>
      <p>{article?.content}</p>
    </div>
  );
}

function Image(props) {
  return (
    <div className="image-container">
      <img
        className="image"
        src={props.imageUrl}
        alt="article"
        width="100%"
        height="auto"
      ></img>
    </div>
  );
}

function Articles() {
  return (
    <div className="container">
      <div className="">
        <ul className="articles-list">
          {articles.map((article) => (
            <li className="article" key={article.id}>
              <Image imageUrl={article.imageUrl}></Image>
              <h2>{article.title}</h2>
              <p>{truncate(article.content, 200)}</p>
              <Link href={`/articles/${article.id}`}>Read more</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function truncate(text, maxLength, suffix = "...") {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength - suffix.length) + suffix;
  }
}

export default Articles;
