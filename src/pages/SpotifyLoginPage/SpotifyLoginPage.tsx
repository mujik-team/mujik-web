import React, { useContext, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { SpotifyContext } from "../../App";
import Button from "../../components/Button";
import { authorize, getAccessToken } from "../../services/spotifyService";

function SpotifyLoginPage() {
  const location = useLocation();
  const spotifyContext = useContext(SpotifyContext);
  const history = useHistory();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (params.has("code")) {
      getAccessToken(params.get("code")!).then(() => {
        spotifyContext.actions.initPlayer();
        history.push("/");
      });
    }
  }, []);

  return (
    <Container>
      <h2>Login with Spotify</h2>
      <Button onClick={() => authorize()}>Authorize</Button>
    </Container>
  );
}

export default SpotifyLoginPage;

const Container = styled.div`
  margin: 30px;
`;
