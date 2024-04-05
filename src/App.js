import React, { useState } from "react";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Articles, { ArticleDetails } from "./Articles";
import { Router, Route, Link } from "./Router";

function Menu({ currentPath }) {
  const menuItems = [
    { path: "/", title: "Home" },
    { path: "/articles", title: "Articles" },
    { path: "/about", title: "About" },
  ];

  return (
    <nav className="menu">
      <ul>
        {menuItems.map((item, index) => {
          return (
            <li
              key={`item-${index}`}
              className={currentPath === item.path ? "selected" : ""}
            >
              <Link href={item.path}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState("");
  const onRouteChange = (route) => setCurrentPath(route);
  return (
    <div className="App">
      <header className="App-header">
        <Menu currentPath={currentPath} />
      </header>
      <main>
        <Router className="container" onRouteChange={onRouteChange}>
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
