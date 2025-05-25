import {ECSManager, System} from "../../ECS/ecs.ts";
import type {PreScreen} from "../../Core/Screen/preScreen.ts";
import {type AnimationComponent, BuiltInComName} from "../../Components";
import type {Position} from "../../Core/types.ts";

export class AnimationRenderSystem extends System {
    private frameNum: number = 0;

    public update(deltaTime:number): void {

        for (const entity of this.entities) {
            const animation = this.getComponent<AnimationComponent>(entity, BuiltInComName.ANIMATION);
            const position = this.getComponent<Position>(entity, BuiltInComName.POS);

            if (animation && position) {

                const frameCount = animation?.frames.length ?? 0;
                this.frameNum += deltaTime / animation.frameDuration;
                const currentFrame = Math.floor(this.frameNum) % frameCount;


                this.screen.DrawPicture(animation.frames[currentFrame], position);
            }
        }
    }

    screen: PreScreen;

    public constructor(
        ecs: ECSManager,
        screen: PreScreen
    ) {
        super(ecs);
        this.screen = screen;
    }
}