// Core
import { getFullApiUrl } from "instruments";

const GROUP_ID = "ecIqjXayz6K2";
const TOKEN = "1yywu38ct0";

const SOCKET_URL = "https://lab.lectrum.io";
const ROOT_URL = "https://lab.lectrum.io/react/api";
const MAIN_URL = getFullApiUrl(ROOT_URL, GROUP_ID);

export { GROUP_ID, TOKEN, MAIN_URL, SOCKET_URL };
