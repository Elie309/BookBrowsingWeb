import axios from 'axios';

const AUTH_SERVER = "https://dev-j0zlk7gogm1b2ben.us.auth0.com";
const CLIENT_ID = "ffe47fxGRhuze07vSOfbagpinW4Hnz0w";
const REDIRECT_URI = "http://localhost:3000";

const CODE_VERIFIER_STORAGE_KEY = "pkce_code_verifier";


class AuthService {

  static TEMP_USERNAME_KEY = "temp_username";
  static CODE_CHALLENGE_METHOD = "S256";
  static SCOPE = "openid profile email";

  static generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  static async generateCodeChallenge(codeVerifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }


  static async login(username: string, password: string) {
    const codeVerifier = this.generateCodeVerifier();
    sessionStorage.setItem(CODE_VERIFIER_STORAGE_KEY, codeVerifier);

    const codeChallenge = await this.generateCodeChallenge(codeVerifier);

    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: "code",
      redirect_uri: REDIRECT_URI,
      scope: this.SCOPE,
      code_challenge: codeChallenge,
      code_challenge_method: this.CODE_CHALLENGE_METHOD
    });


    const authUrl =  `${AUTH_SERVER}/authorize?${params.toString()}`;

    window.location.href = authUrl;
  }

  static async exchangeCodeForToken(code: string) {
    try {

      const codeVerifier = sessionStorage.getItem(CODE_VERIFIER_STORAGE_KEY);
      if (!codeVerifier) throw new Error("Missing PKCE code verifier");

      const response = await axios.post(`${AUTH_SERVER}/oauth/token`, {
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier,
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      const { access_token } = response.data;


      const userInfoResponse = await axios.get(`${AUTH_SERVER}/userinfo`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });

      const actualUsername = userInfoResponse.data.username;

      const storedUsername = sessionStorage.getItem(this.TEMP_USERNAME_KEY);
      if (storedUsername !== actualUsername) {
        throw new Error("Username mismatch: Possible incorrect credentials.");
      }

      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("username", actualUsername);
      sessionStorage.setItem("access_token", access_token);

      return access_token;
    } catch (err) {
      console.error(err);
    }
  }

  static getAccessToken(): string | null {
    return sessionStorage.getItem("access_token");
  }
}

export default AuthService;
