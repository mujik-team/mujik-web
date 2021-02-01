import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import TournamentPage from "./pages/TournamentPage/TournamentPage";
import TournamentDetails from "./pages/TournamentDetailsPage/TournamentDetailsPage";
import MixtapeDetailsPage from "./pages/MixtapeDetailsPage/MixtapeDetailsPage";
import UserProfileScreen from "./pages/UserProfilePage/UserProfilePage";
import AppHeader from "./components/AppHeader";
import RewardsPage from "./pages/RewardsPage/RewardsPage";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import { ToastContainer, Slide } from "react-toastify";
import SpotifyLoginPage from "./pages/SpotifyLoginPage/SpotifyLoginPage";

import useSpotify from "./hooks/useSpotify";
import styled from "styled-components";

import CreateTournamentPage from "./pages/CreateTournamentPage/CreateTournamentPage";
import useAuth from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/WelcomePage/components/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";

type AuthState = ReturnType<typeof useAuth>;
export const AuthContext: React.Context<AuthState> = React.createContext(
  {} as any
);

type SpotifyState = ReturnType<typeof useSpotify>;
export const SpotifyContext: React.Context<SpotifyState> = React.createContext(
  {} as any
);

function App() {
  const authContext = useAuth();
  const spotify = useSpotify();

  const app = (
    <AppContainer>
      {/* <AppHeader /> */}
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" component={LoginPage} />

        <RouterContainer>
          <Navbar />
          <ProtectedRoute path="/home" exact component={HomePage} />
          <ProtectedRoute path="/library" component={LibraryPage} />
          <ProtectedRoute path="/tournament" exact component={TournamentPage} />
          <ProtectedRoute
            path="/mixtape/:mixtapeId"
            component={MixtapeDetailsPage}
          />
          <ProtectedRoute
            path="/tournament/new"
            component={CreateTournamentPage}
          />
          <ProtectedRoute
            path="/tournament/:tournamentId"
            component={TournamentDetails}
          />
          <ProtectedRoute path="/rewards" component={RewardsPage} />
          <ProtectedRoute
            path="/user/:username"
            component={UserProfileScreen}
          />
          <ProtectedRoute
            path="/spotify/authorize"
            component={SpotifyLoginPage}
          />
        </RouterContainer>
      </Switch>

      <MusicPlayerContainer>
        <MusicPlayer />
      </MusicPlayerContainer>
    </AppContainer>
  );

  return (
    <BrowserRouter>
      <AuthContext.Provider value={authContext}>
        <SpotifyContext.Provider value={spotify}>
          {app}
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
