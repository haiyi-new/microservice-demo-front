// Import the required libraries
// require("dotenv").config();

import { Configuration, PublicApi, AdminApi } from "@ory/client";
import { FusionAuthClient } from "@fusionauth/typescript-client";
// import { getAccessToken } from '/node_modules/@ory/client';
const secret = process.env.SECRET || "";
const url = process.env.AUTH_URL || "http://localhost:9011";
const username = process.env.AUTH_USER || "client";
const password = process.env.AUTH_PASSWORD || "123456";
const secretid =
  process.env.AUTH_APP_ID || "00000000-0000-0000-0000-000000000002";

console.log("0000000000000000000000000000000000000000000000000000", secret);

const authenticateLink = document.getElementById("authenticate-link");
authenticateLink.addEventListener("click", authenticate);

const client = new FusionAuthClient(secret, url);

async function authenticate(event) {
  // event.preventDefault();
  try {
    const response = await client.login({
      loginId: username,
      password: password,
      applicationId: secretid,
    });

    if (response.wasSuccessful()) {
      const authorizeStatusElement =
        document.getElementById("authorize-status");
      authorizeStatusElement.textContent = "Authorize Status: Authorized";
      document.getElementById("authenticate-link").style.display = "none";
      document.getElementById("auth-api").style.display = "block";
      const statuscontent = document.getElementById("status-content");
      statuscontent.textContent = "Status: Sign in";
      document.getElementById("authorize-status-api").textContent =
        "Authorize Status: Authorized";
      console.log("Access Token: ", response.response.token);

      localStorage.setItem("token", response.response.token);
    } else {
      console.error("Error getting token: ", response);
    }
  } catch (error) {
    const authorizeStatusElement = document.getElementById("authorize-status");
    authorizeStatusElement.textContent = "Authorize Status: Not Authorized";
    console.error("Error getting token: ", error);
  }
}

// Authenticate with password grant
// async function authenticate() {
//   try {
//     const accessToken = new Configuration({
//       // username: 'your_username',
//       // password: 'your_password',
//       client_id: "96c843dc-6859-443b-89c7-021ec4fa0e12",
//       client_secret: "FOkVQt6pb9tFicrifI34hvVyB1",
//       scope: "offline_access offline openid",
//     });
//     const authorizeStatusElement = document.getElementById("authorize-status");
//     authorizeStatusElement.textContent = "Authorize Status: Authorized";
//     console.log("berjaya", accessToken);
//     // console.log('Access Token:', accessToken);
//     // Handle the access token as needed
//   } catch (error) {
//     const authorizeStatusElement = document.getElementById("authorize-status");
//     authorizeStatusElement.textContent = "Authorize Status: Not Authorized";
//     // console.log('tak berjaya',error);
//     console.error("Authentication failed:", error);
//   }
// }

// Call the authenticate function
// authenticate();

// window. addEventListener("popstate", router);
// document.addEventListener("DOMContentLoaded", () => {
//     document.body.addEventListener("click",e =>{
//         if (e.target.matches("[data-link]"))
//         {
//             e.preventDefault();
//             navigateTo(e.target.href)
//         }
//     })
//     router();
// });
