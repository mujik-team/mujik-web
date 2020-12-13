import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import TournamentPage from "./pages/TournamentBrowserPage/TournamentPage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import TournamentDetails from "./pages/TournamentDetailsPage/TournamentDetailsPage";
import MixtapeDetailsPage from "./pages/MixtapeDetailsPage/MixtapeDetailsPage";
import UserProfileScreen from "./pages/UserProfilePage/UserProfilePage";
import AppHeader from "./components/AppHeader";
import RewardsPage from "./pages/RewardsPage/RewardsPage";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import { ToastContainer, Slide } from "react-toastify";
import useAuth, { AuthState } from "./hooks/useAuth";
import SpotifyLoginPage from "./pages/SpotifyLoginPage/SpotifyLoginPage";

import useSpotify from "./hooks/useSpotify";
import styled from "styled-components";

import CreateTournamentPage from "./pages/CreateTournamentPage/CreateTournamentPage";

export const AuthContext: React.Context<AuthState> = React.createContext(
  {} as AuthState
);

export const SpotifyContext: React.Context<
  ReturnType<typeof useSpotify>
> = React.createContext({} as any);

function App() {
  const [authState] = useAuth();
  const spotify = useSpotify();

  const app = (
    <AppContainer>
      <Navbar />

      <RouterContainer>
        <AppHeader />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/library" component={LibraryPage} />
          <Route path="/tournament" exact component={TournamentPage} />
          <Route path="/mixtape/:mixtapeId" component={MixtapeDetailsPage} />
          <Route path="/tournament/new" component={CreateTournamentPage} />
          <Route
            path="/tournament/:tournamentId"
            component={TournamentDetails}
          />
          <Route path="/rewards" component={RewardsPage}></Route>
          <Route path="/user/:username" component={UserProfileScreen} />
          <Route path="/spotify/authorize" component={SpotifyLoginPage} />
        </Switch>
      </RouterContainer>

      <MusicPlayerContainer>
        <MusicPlayer />
      </MusicPlayerContainer>
    </AppContainer>
  );

  return (
    <BrowserRouter>
      <AuthContext.Provider value={authState as AuthState}>
        <SpotifyContext.Provider value={spotify}>
          {(authState as AuthState).isLoggedIn ? app : <WelcomePage />}
          <ToastContainer
            position={"bottom-right"}
            autoClose={2000}
            transition={Slide}
          />
        </SpotifyContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: calc(100vh - 120px) 120px;
`;

const RouterContainer = styled.div`
  overflow-y: scroll;
`;

const MusicPlayerContainer = styled.div`
  z-index: 1;
  grid-column: 1 / span 2;
  background: var(--card-color-secondary);
  box-shadow: 0 -4px 15px 0px rgba(0, 0, 0, 0.25);
`;
