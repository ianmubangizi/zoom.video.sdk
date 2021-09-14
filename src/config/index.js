import { getExploreName } from "../utils/platform";

const randomUser = `${getExploreName()}-${Math.floor(Math.random() * 1000)}`;

// The testing config from env
const Config = {
  name: randomUser,
  
  topic: process.env.REACT_APP_MEETING_TOPIC || "",
  password: process.env.REACT_APP_MEETING_PASSWORD || "",
  
  username: process.env.REACT_APP_MEETING_USERNAME || "",
  signature: process.env.REACT_APP_MEETING_SIGNATURE || "",

  sdkKey: process.env.REACT_APP_MEETING_SDK_KEY || "",
  sdkSecret: process.env.REACT_APP_MEETING_SDK_SECRET || "",
};

console.log(Config)

export default Config;
