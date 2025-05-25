import type {Picture} from "../../../BaseApp/Core/types.ts";

type Animations = {
    [key: string]: Picture[];
}

const BirdPicture: Picture = [
    [" ", " ", "|", "|", "|", " ", " "],
    [" ", "(", "'", "V", "'", ")", " "],
    ["(", "(", "_", "_", "_", ")", ")"],
    [" ", " ", "^", " ", "^", " ", " "],
]

const BirdEyeClosedPicture = [
    [" ", " ", "|", "|", "|", " ", " "],
    [" ", "(", "`", "V", "`", ")", " "],
    ["(", "(", "_", "_", "_", ")", ")"],
    [" ", " ", "^", " ", "^", " ", " "],
]

export const BirdAnimation: Animations = {
    IDLE: [
        BirdPicture,
        BirdPicture,
        BirdPicture,
        BirdEyeClosedPicture
    ],
}