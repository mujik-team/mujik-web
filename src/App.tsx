import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import TournamentPage from "./pages/TournamentPage/TournamentPage";
import { AuthState } from "./services/auth/types";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import * as authService from "./services/auth/authService";

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

  const logout = async () => {
    await authService.logout();
    setAuthState({ ...authState, currentUser: null, isLoggedIn: false });
  };

  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    currentUser: null,
    login,
    logout,
  } as AuthState);

  // Enable auto-login
  useEffect(() => {
    login("mckillagorilla", "coolpassword");
  }, []);

  const app = (
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
  );

  return (
    <BrowserRouter>
      <AuthContext.Provider value={authState}>
        {authState.isLoggedIn ? app : <WelcomePage />}
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
