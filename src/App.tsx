import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import TournamentBrowser from "./pages/TournamentBrowserPage/TournamentBrowser";
import { AuthState } from "./services/auth/types";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import * as authService from "./services/auth/authService";
import TournamentDetails from "./pages/TournamentDetailsPage/TournamentDetails";
import MixtapeDetailsScreen from "./pages/MixtapeDetailsPage/MixtapeDetailsPage";
import UserProfileScreen from "./pages/UserProfilePage/UserProfilePage";
import AppHeader from "./components/AppHeader";
import RewardsPage from "./pages/RewardsPage/RewardsPage";
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";
import { ToastContainer, Slide } from "react-toastify";
import { getUser } from "./services/user/userService";

export const AuthContext: React.Context<AuthState> = React.createContext(
  {} as AuthState
);

function App() {
  const login = async (u: string, p: string) => {
    const user = await authService.login(u, p);

    if (user) {
      setAuthState({ ...authState, currentUser: user, isLoggedIn: true });
    }
  };

  const update = async (newUser: any) => {
    const user = await getUser(localStorage.getItem("username")!);
    setAuthState({ ...authState, currentUser: user, isLoggedIn: true });
  };

  const logout = async () => {
    await authService.logout();
    setAuthState({ ...authState, currentUser: null, isLoggedIn: false });
  };

  const [showPlayer, setShowPlayer] = useState(false);

  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    currentUser: null,
    update,
    login,
    logout,
  } as AuthState);

  // Enable auto-login
  useEffect(() => {
    if (authService.checkIfLoggedIn()) {
      login(
        localStorage.getItem("username")!,
        localStorage.getItem("password")!
      );
    }
  }, []);

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
      <AuthContext.Provider value={authState}>
        {authState.isLoggedIn ? app : <WelcomePage />}
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
