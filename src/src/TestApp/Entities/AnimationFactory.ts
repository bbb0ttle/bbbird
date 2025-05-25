import type {Picture, Position} from "../../BaseApp/Core/Screen/tyes.ts";
import {ECSManager, type EntityId} from "../../BaseApp/ECS/ecs.ts";
import {
    type AnimationComponent,
    BuiltInComName,
    type GravityComponent,
    type VelocityComponent
} from "../../BaseApp/Components";

export const createAnimation = (ecs: ECSManager, frames: Picture[], pos: Position): EntityId => {
    const animationEntity: EntityId = ecs.createEntity();

    ecs.addComponent<AnimationComponent>(animationEntity, BuiltInComName.ANIMATION, {
        frames: frames,
        frameDuration: 0.2,
    });

    ecs.addComponent<Position>(animationEntity, BuiltInComName.POS, pos);

    ecs.addComponent<VelocityComponent>(animationEntity, BuiltInComName.VEL, {
        vx: 0,
        vy: 0
    });

    ecs.addComponent<GravityComponent>(animationEntity, BuiltInComName.GRAVITY_ACCELERATION, {
        scale: 1.2
    });

    return animationEntity;
}