import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import TournamentPage from "./pages/TournamentPage/TournamentPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="router">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/library" component={LibraryPage} />
            <Route path="/tournament" component={TournamentPage} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
