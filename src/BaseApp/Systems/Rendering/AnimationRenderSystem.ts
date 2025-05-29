import {System} from "../../ECS/ecs.ts";
import {type AnimationComponent, BuiltInComName} from "../../Components";
import {Position} from "../../Core/types.ts";
import {autoRegisterSys} from "../../ECS/decoractors.ts";

@autoRegisterSys([
    BuiltInComName.ANIMATION,
    Position.name,
])
export class AnimationRenderSystem extends System {
    private frameNum: number = 0;

    public update(deltaTime:number): void {

        for (const entity of this.entities) {
            const animation = this.getComponent<AnimationComponent>(entity, BuiltInComName.ANIMATION);
            const position = this.getComponent<Position>(entity, Position.name);

            if (animation && position) {
                const frames = animation.animations[animation.currentAnimationName];
                if (!frames) {
                    continue; // 如果没有找到对应的帧，跳过当前实体
                }
                const frameCount = frames.length ?? 0;
                this.frameNum += deltaTime / animation.frameDuration;
                const currentFrame = Math.floor(this.frameNum) % frameCount;


                this.screen.DrawPicture(frames[currentFrame], position);
            }
        }
    }
}