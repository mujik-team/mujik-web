import React, { useContext, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { SpotifyContext } from "../../App";
import Button from "../../components/Button";
import { authorize, getAccessToken } from "../../services/spotifyService";

function SpotifyLoginPage() {
  const location = useLocation();
  const { spotifyService, handleUserAuthorizedApp } = useContext(
    SpotifyContext
  );
  const history = useHistory();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (params.has("code")) {
      handleUserAuthorizedApp(params.get("code")!).then(() => {
        toast.dark("🥳 Spotify is now linked!");
        history.push("/");
      });
    }
  }, []);

  const handleClick = () => {
    spotifyService.auth.requestAccountAuthorization();
  };

  return (
    <Container>
      <h2>Login with Spotify</h2>
      <Button onClick={handleClick}>Authorize</Button>
    </Container>
  );
}

export default SpotifyLoginPage;

const Container = styled.div`
  margin: 30px;
`;
