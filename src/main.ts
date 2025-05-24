import { PreScreen } from './src/preScreen';
import {BBF} from "./src/FontLib/bbf/bbf.ts";

const s = new PreScreen();

s.DrawCenterString("HELLO WORLD", BBF, "=");
