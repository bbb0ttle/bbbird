import type {FramesAnimation, Position} from "../../BaseApp/Core/types.ts";
import {ECSManager, type EntityId} from "../../BaseApp/ECS/ecs.ts";
import {
    type AnimationComponent,
    BuiltInComName,
    type GravityComponent,
    type VelocityComponent
} from "../../BaseApp/Components";
import type {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";

export const createAnimation = (ecs: ECSManager, animation: FramesAnimation, defaultName: string, pos: Position): EntityId => {
    const animationEntity: EntityId = ecs.createEntity();

    ecs.addComponent<AnimationComponent>(animationEntity, BuiltInComName.ANIMATION, {
        animations: animation,
        frameDuration: 0.2,
        loop: true,
        currentAnimationName: defaultName
    });

    ecs.addComponent<Position>(animationEntity, BuiltInComName.POS, pos);

    ecs.addComponent<VelocityComponent>(animationEntity, BuiltInComName.VEL, {
        vx: 0,
        vy: 0
    });

    ecs.addComponent<GravityComponent>(animationEntity, BuiltInComName.GRAVITY_ACCELERATION, {
        scale: 1.2
    });

    const frames = animation[defaultName];

    ecs.addComponent<ColliderComponent>(animationEntity, BuiltInComName.COLLISION, {
        size: {
            width: frames[0][0].length,
            height: frames[0].length
        },
        onCollision: (_) => {
            // 取消重力
            ecs.getComponentMap<GravityComponent>(BuiltInComName.GRAVITY_ACCELERATION).get(animationEntity)!.scale = 0;

            // 待机
            ecs.getComponentMap<AnimationComponent>(BuiltInComName.ANIMATION).get(animationEntity)!.currentAnimationName = "IDLE"
        }
    })

    return animationEntity;
}