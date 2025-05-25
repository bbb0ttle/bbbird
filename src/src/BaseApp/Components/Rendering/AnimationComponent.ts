import type {Picture} from "../../Core/types.ts";

export interface AnimationComponent {
    frames: Picture[];
    frameDuration: number;
}