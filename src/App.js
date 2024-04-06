import React from "react";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Articles, { ArticleDetails } from "./Articles";
import { Router, Route } from "./Router";
import { Menu } from "./Menu";
import { GlobalContextProvider } from "./GlobalContextProvider";

function App() {
  console.log("App is rendered");

  return (
    <GlobalContextProvider>
      <div className="App">
        <header className="App-header">
          <Menu />
        </header>
        <main>
          <Router className="container">
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/articles" component={Articles} />
            <Route path="/article/:id" component={ArticleDetails} isDynamic />
          </Router>
        </main>
      </div>
    </GlobalContextProvider>
  );
}

export default App;
