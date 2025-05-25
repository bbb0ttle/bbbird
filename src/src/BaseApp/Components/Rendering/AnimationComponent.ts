import type {Picture} from "../../Core/Screen/tyes.ts";

export interface AnimationComponent {
    frames: Picture[];
    frameDuration: number;
}