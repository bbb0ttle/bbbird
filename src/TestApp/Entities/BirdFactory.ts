import type {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";
import {type AnimationComponent, BuiltInComName, type GravityComponent} from "../../BaseApp/Components";
import type {ECSManager} from "../../BaseApp/ECS/ecs.ts";
import {createAnimation} from "./AnimationFactory.ts";
import {BirdAnimation} from "../Assets/Animations/bird.ts";

export const createBird = (ecs: ECSManager) => {
    const bird = createAnimation(ecs,  BirdAnimation, "FLY", {
        x: 4,
        y: 14
    })

    ecs.addComponent<ColliderComponent>(bird, BuiltInComName.COLLISION, {
        size: {
            width: 7,
            height: 4,
        },
        onCollision: (_) => {
            // 取消重力
            ecs.getComponentMap<GravityComponent>(BuiltInComName.GRAVITY_ACCELERATION).get(bird)!.scale = 0;

            // 待机
            ecs.getComponentMap<AnimationComponent>(BuiltInComName.ANIMATION).get(bird)!.currentAnimationName = "IDLE"
        }
    })

}