import React, { useState } from "react";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Articles, { ArticleDetails } from "./Articles";
import { Router, Route } from "./Router";
import { Menu } from "./Menu";

function App() {
  console.log("App is rendered");
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
