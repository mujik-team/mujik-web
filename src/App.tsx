import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import TournamentBrowser from "./pages/TournamentBrowserPage/TournamentBrowser";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import TournamentDetails from "./pages/TournamentDetailsPage/TournamentDetails";
import MixtapeDetailsScreen from "./pages/MixtapeDetailsPage/MixtapeDetailsPage";
import UserProfileScreen from "./pages/UserProfilePage/UserProfilePage";
import AppHeader from "./components/AppHeader";
import RewardsPage from "./pages/RewardsPage/RewardsPage";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import { ToastContainer, Slide } from "react-toastify";
import useAuth, { AuthState } from "./hooks/useAuth";
import SpotifyLoginPage from "./pages/SpotifyLoginPage/SpotifyLoginPage";
import useSpotify, { SpotifyState } from "./hooks/useSpotify";

export const AuthContext: React.Context<AuthState> = React.createContext(
  {} as AuthState
);

export const SpotifyContext: React.Context<SpotifyState> = React.createContext(
  {} as SpotifyState
);

function App() {
  const [showPlayer, setShowPlayer] = useState(false);
  const [authState, setAuthState] = useAuth();
  const [spotifyState, actions] = useSpotify();

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
          <Route path="/spotify/authorize" component={SpotifyLoginPage} />
        </Switch>
      </div>
    </div>
  );

  return (
    <BrowserRouter>
      <AuthContext.Provider value={authState as AuthState}>
        <SpotifyContext.Provider value={spotifyState}>
          {(authState as AuthState).isLoggedIn ? app : <WelcomePage />}
          <ToastContainer
            position={"bottom-right"}
            autoClose={3000}
            transition={Slide}
          />
        </SpotifyContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
