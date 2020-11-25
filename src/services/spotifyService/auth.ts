import axios from "axios";
import qs from "querystring";

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirect_uri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const verifyCode = "Zg6klgrnixQJ629GsawRMV8MjWvwRAr-vyvP1MHnB6X8WKZN";

export async function requestAccountAuthorization() {
  // Create request.
  let code_challenge = await generateChallenge(verifyCode);
  const scope =
    "streaming user-read-email user-read-private user-modify-playback-state";

  const params = {
    response_type: "code",
    client_id,
    redirect_uri,
    code_challenge,
    code_challenge_method: "S256",
    scope,
  };

  let url: any = axios.getUri({
    url: "https://accounts.spotify.com/authorize",
    params,
  });

  // Redirect user to the authorization url.
  window.location.href = url;
}

/**
 * This method retrieves the initial access token after the
 * client has authorized the use of the API.
 * @param code The code returned by the callback url.
 */
export async function getInitialAccessToken(code: string) {
  const body = {
    client_id,
    grant_type: "authorization_code",
    code,
    redirect_uri,
    code_verifier: verifyCode,
  };

  const { data } = await axios.post(
    "https://accounts.spotify.com/api/token",
    qs.stringify(body),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const { access_token, refresh_token } = data;

  localStorage.setItem("spotify_access_token", access_token);
  localStorage.setItem("spotify_refresh_token", refresh_token);

  return { access_token, refresh_token };
}

/**
 * Used to retrieve a refreshed access token if the previous one was expired.
 * @param refresh_token The refresh_token provided earlier.
 */
export async function refreshAccessToken(refresh_token: string) {
  try {
    const body = {
      grant_type: "refresh_token",
      refresh_token,
      client_id,
    };
    const { data } = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.stringify(body),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    // Update refresh_token to new one.
    localStorage.setItem("spotify_refresh_token", data.refresh_token);

    return data.access_token;
  } catch (err) {
    console.log("Unable refresh access token", err);
    return null;
  }
}

// Utility functions used during authorization flow.
async function sha256(plain: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);

  return window.crypto.subtle.digest("SHA-256", data);
}
function base64urlencode(a: any) {
  // Convert the ArrayBuffer to string using Uint8 array.
  // btoa takes chars from 0-255 and base64 encodes.
  // Then convert the base64 encoded to base64url encoded.
  // (replace + with -, replace / with _, trim trailing =)
  return btoa(String.fromCharCode.apply(null, new Uint8Array(a) as any))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function generateChallenge(v: any) {
  let hashed = await sha256(v);
  let base64encoded = base64urlencode(hashed);
  return base64encoded;
}
