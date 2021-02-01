import React, { useContext } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { AuthContext } from "../App";

function ProtectedRoute(props: Props) {
  const { state } = useContext(AuthContext);

  const { isAuthenticating, isAuthenticated } = state;

  if (isAuthenticating) {
    return <div></div>;
  }

  return isAuthenticated ? (
    <Route exact={props.exact} path={props.path} component={props.component} />
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
}

export default ProtectedRoute;

interface Props {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  path: string;
  exact?: boolean;
}
