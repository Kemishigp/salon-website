// Go up 3 levels: [...all] -> auth -> api -> app, then find lib
import { auth } from "../../../lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);