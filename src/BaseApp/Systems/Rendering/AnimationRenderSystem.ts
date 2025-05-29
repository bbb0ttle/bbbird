import {System} from "../../ECS/ecs.ts";
import {AnimationComponent} from "../../Components";
import {Position} from "../../Core/types.ts";
import {autoRegisterSys} from "../../ECS/decoractors.ts";
import {random} from "../../Utils";

@autoRegisterSys([
    AnimationComponent.name,
    Position.name,
])
export class AnimationRenderSystem extends System {
    private frameNum: number = 0;

    public update(deltaTime:number): void {

        for (const entity of this.entities) {
            const animation = this.getComponent<AnimationComponent>(entity, AnimationComponent.name);
            const position = this.getComponent<Position>(entity, Position.name);

            if (animation && position) {
                const frames = animation.animations[animation.currentAnimationName];
                if (!frames) {
                    continue; // 如果没有找到对应的帧，跳过当前实体
                }
                const frameCount = frames.length ?? 0;

                const minDuration = animation.frameDuration * 2 / 3;
                const randDuration = random(minDuration, animation.frameDuration);
                const duration = animation.randomFrameDuration
                    ? randDuration
                    : animation.frameDuration;

                this.frameNum += deltaTime / duration;
                const currentFrame = Math.floor(this.frameNum) % frameCount;


                this.screen.DrawPicture(frames[currentFrame], position);
            }
        }
    }
}