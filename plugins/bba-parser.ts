import type {FramesAnimation} from "../src/BaseApp/Core/types";
import { multilineStrToPicture } from "../src/BaseApp/Utils/StrHelper";

export const BBARegex = /\[name=([^\]]+)\]([^]*?)(?=\[name=|$)/g;

export const BBAParser = (source: string): FramesAnimation => {
    const animations: FramesAnimation = {};
    // 这个正则表达式会匹配每一个 [name=...]区块
    const regex = BBARegex;

    let match;

    while ((match = regex.exec(source)) !== null) {
        const name = match[1].toUpperCase().trim();
        const animationContent = match[2];

        // 将动画内容按空行分割成独立的帧
        const frames = animationContent
            .trimEnd()
            .split(/\n\s*\n/)
            .filter(frame => frame);

        animations[name] = frames.map(multilineStrToPicture);
    }

    return animations
}