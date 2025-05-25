import type {Picture, Position} from "../../BaseApp/Core/Screen/tyes.ts";
import {ECSManager, type EntityId} from "../../BaseApp/ECS/ecs.ts";
import {type AnimationComponent, BuiltInComName} from "../../BaseApp/Components";

export const createAnimation = (ecs: ECSManager, frames: Picture[], pos: Position): EntityId => {
    const animationEntity: EntityId = ecs.createEntity();

    ecs.addComponent<AnimationComponent>(animationEntity, BuiltInComName.ANIMATION, {
        frames: frames,
        frameDuration: 0.2,
    });

    ecs.addComponent<Position>(animationEntity, BuiltInComName.POS, pos);

    return animationEntity;
}