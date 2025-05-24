import { PreScreen } from './src/preScreen';
import {BBF} from "./src/FontLib/bbf/bbf.ts";

const s = new PreScreen(
    70,
    40,
    ' '
);

s.DrawCenterString("HELLO", BBF, "_");
