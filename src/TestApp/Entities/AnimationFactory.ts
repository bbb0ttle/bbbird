import {type FramesAnimation, Position} from "../../BaseApp/Core/types.ts";
import {ECSManager, type EntityId} from "../../BaseApp/ECS/ecs.ts";
import {
    AnimationComponent,
} from "../../BaseApp/Components";

export const createAnimation = (
    ecs: ECSManager,
    animation: FramesAnimation,
    defaultName: string,
    pos: Position): EntityId => {
    const animationEntity: EntityId = ecs.createEntity();

    ecs.addComponent<AnimationComponent>(animationEntity, AnimationComponent.name, {
        animations: animation,
        frameDuration: 0.25,
        loop: true,
        currentAnimationName: defaultName,
        randomFrameDuration: false
    });

    ecs.addComponent<Position>(animationEntity, Position.name, pos);

    return animationEntity;
}