export type AuthState = {
    isLoggedIn: boolean;
    currentUser?: any;
    login: (u: string, p: string) => any;
    logout: () => any;
  };