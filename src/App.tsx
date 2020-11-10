import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import TournamentBrowser from "./pages/TournamentBrowserPage/TournamentBrowser";
import { AuthState } from "./services/auth/types";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import TournamentDetails from "./pages/TournamentDetailsPage/TournamentDetails";
import MixtapeDetailsScreen from "./pages/MixtapeDetailsPage/MixtapeDetailsPage";
import UserProfileScreen from "./pages/UserProfilePage/UserProfilePage";
import AppHeader from "./components/AppHeader";
import RewardsPage from "./pages/RewardsPage/RewardsPage";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import { ToastContainer, Slide } from "react-toastify";
import useAuth from "./hooks/useAuth";

export const AuthContext: React.Context<AuthState> = React.createContext(
  {} as AuthState
);

function App() {
  const [showPlayer, setShowPlayer] = useState(false);
  const [authState, setAuthState] = useAuth();

  const app = (
    <div className="app">
      <Navbar />
      <MusicPlayer
        showPlayer={showPlayer}
        toggle={() => setShowPlayer(!showPlayer)}
      />

      <div className="router">
        <AppHeader />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/library" component={LibraryPage} />
          <Route path="/tournament" exact component={TournamentBrowser} />
          <Route path="/mixtape/:mixtapeId" component={MixtapeDetailsScreen} />
          <Route
            path="/tournament/:tournamentId"
            component={TournamentDetails}
          />
          <Route path="/rewards" component={RewardsPage}></Route>
          <Route path="/user/:username" component={UserProfileScreen} />
        </Switch>
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <AuthContext.Provider value={authState as AuthState}>
        {(authState as AuthState).isLoggedIn ? app : <WelcomePage />}
        <ToastContainer
          position={"bottom-right"}
          autoClose={3000}
          transition={Slide}
        />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
