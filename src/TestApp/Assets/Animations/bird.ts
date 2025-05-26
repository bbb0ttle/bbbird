import type {FramesAnimation, Picture} from "../../../BaseApp/Core/types.ts";
import {multilineStrToPicture} from "../../../BaseApp/Utils/StrHelper.ts";
import {BirdStr0, BirdStr1, BirdStr2, BirdStr3} from "../Raw/bird.str.ts";

const normal: Picture = multilineStrToPicture(BirdStr0);
const eyeClosed = multilineStrToPicture(BirdStr1);

export const BirdAnimation: FramesAnimation = {
    IDLE: [
        normal,
        normal,
        normal,
        eyeClosed
    ],
    FLY: [
        multilineStrToPicture(BirdStr3),
        multilineStrToPicture(BirdStr2),
        multilineStrToPicture(BirdStr3),
        multilineStrToPicture(BirdStr2),
    ],
    FALLING: [
        multilineStrToPicture(BirdStr3),
    ]
}