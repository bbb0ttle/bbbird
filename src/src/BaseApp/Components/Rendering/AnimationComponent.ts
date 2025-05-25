import type {FramesAnimation} from "../../Core/types.ts";

export interface AnimationComponent {
    frameDuration: number;
    loop: boolean; // 是否循环播放
    animations: FramesAnimation
    currentAnimationName: string;
}