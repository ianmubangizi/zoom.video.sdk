/* eslint-disable no-restricted-globals */
import React from "react";
import ReactDOM from "react-dom";
import ZoomVideo from "@zoom/videosdk";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ZoomContext from "./context/zoom-context";
import Config from "./config";
import { generateVideoToken } from "./utils/util";

require('dotenv').config()


let meetingArgs = {
  ...Config,
  ...Object.fromEntries(new URLSearchParams(location.search)),
};

if (!meetingArgs.signature && meetingArgs.sdkSecret && meetingArgs.topic) {
  meetingArgs.signature = generateVideoToken(
    meetingArgs.sdkKey,
    meetingArgs.sdkSecret,
    meetingArgs.topic,
    meetingArgs.password,
    meetingArgs.username,
    meetingArgs.sessionKey
  );
}

const zmClient = ZoomVideo.createClient();

ReactDOM.render(
  <React.StrictMode>
    <ZoomContext.Provider value={zmClient}>
      <App meetingArgs={meetingArgs} />
    </ZoomContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
