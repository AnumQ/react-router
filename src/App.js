import React from "react";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Articles, { ArticleDetails } from "./Articles";
import { Router, Route, Link } from "./Router";

function Menu() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/articles">Articles</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu />
      </header>
      <main>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/articles" component={Articles} />
          <Route path="/article/:id" component={ArticleDetails} isDynamic />
        </Router>
      </main>
    </div>
  );
}

export default App;
