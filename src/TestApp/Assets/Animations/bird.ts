import {type FramesAnimation, Picture} from "../../../BaseApp/Core/types.ts";
import {multilineStrToPicture} from "../../../BaseApp/Utils/StrHelper.ts";
import * as rawStr from "../Raw/bird.str.ts";

const normal: Picture = multilineStrToPicture(rawStr.BirdStr0);
const eyeClosed = multilineStrToPicture(rawStr.BirdStr1);

export const BirdAnimation: FramesAnimation = {
    IDLE: [
        normal,
        normal,
        normal,
        eyeClosed
    ],
    FLY: [
        multilineStrToPicture(rawStr.BirdStr3),
        multilineStrToPicture(rawStr.BirdStr2),
        multilineStrToPicture(rawStr.BirdStr3),
        multilineStrToPicture(rawStr.BirdStr2),
    ],
    FALLING: [
        multilineStrToPicture(rawStr.BirdStr3),
    ],
    DIED: [
        multilineStrToPicture(rawStr.BirdStr4),
    ]
}