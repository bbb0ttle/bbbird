import type {FramesAnimation} from "../../Core/types.ts";

export class AnimationComponent {
    frameDuration: number = 0.25;
    loop: boolean = false; // 是否循环播放
    animations: FramesAnimation = {}
    currentAnimationName: string = "";
}