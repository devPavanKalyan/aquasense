import { generatePkceChallenge } from "./pkce";

const mode = import.meta.env.MODE;

let host =
  mode === "production"
    ? "https://aquasense-six.vercel.app"
    : "http://localhost:5200";

const OAUTH_BASE_URL = `${host}/oauth/authorize`;
const CLIENT_ID = "aquasense-client-id";
const REDIRECT_URI = `${host}/dashboard`;
const RESPONSE_TYPE = "code";
const CODE_CHALLENGE_METHOD = "SHA-256";
const FROM = "frontend";
const PAGE = "resolve";
const BACKWARDS_COMPATIBLE = "true";

export const preparePkceAndRedirect = async (
  shouldRedirect: boolean = true
) => {
  try {
    let codeVerifier = sessionStorage.getItem("pkce_verifier");
    let codeChallenge = sessionStorage.getItem("pkce_challenge");
    let state = sessionStorage.getItem("pkce_state");

    if (!codeVerifier || !codeChallenge) {
      const pkce = await generatePkceChallenge();
      codeVerifier = pkce.codeVerifier;
      codeChallenge = pkce.codeChallenge;
      sessionStorage.setItem("pkce_verifier", codeVerifier);
      sessionStorage.setItem("pkce_challenge", codeChallenge);
    }

    if (!state) {
      state = crypto.randomUUID();
      sessionStorage.setItem("pkce_state", state);
    }

    const url = new URL(OAUTH_BASE_URL);
    url.searchParams.set("client_id", CLIENT_ID);
    url.searchParams.set("response_type", RESPONSE_TYPE);
    url.searchParams.set("code_challenge", codeChallenge);
    url.searchParams.set("code_challenge_method", CODE_CHALLENGE_METHOD);
    url.searchParams.set("from", FROM);
    url.searchParams.set("state", state);
    url.searchParams.set("page", PAGE);
    url.searchParams.set("backwards_compatible", BACKWARDS_COMPATIBLE);
    url.searchParams.set("redirect_uri", REDIRECT_URI);

    console.log("PKCE Verifier:", codeVerifier);
    console.log("PKCE Challenge:", codeChallenge);
    console.log("State:", state);
    console.log("Redirect URL:", url.toString());

    if (shouldRedirect) {
      window.location.href = url.toString();
    }
  } catch (error) {
    console.error("PKCE setup failed", error);
    alert("Something went wrong. Please try again.");
  }
};

export const redirectToSignup = () => {
  window.location.href = `${host}/signup?request_type=register`;
};
