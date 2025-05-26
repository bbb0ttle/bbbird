import type {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";
import {
    type AnimationComponent,
    BuiltInComName,
    type GravityComponent,
    type VelocityComponent
} from "../../BaseApp/Components";
import type {ECSManager} from "../../BaseApp/ECS/ecs.ts";
import {createAnimation} from "./AnimationFactory.ts";
import {BirdAnimation} from "../Assets/Animations/bird.ts";
import {InputCompName, type InputComponent} from "../Components/InputComponent.ts";

export const createBird = (ecs: ECSManager) => {
    const bird = createAnimation(ecs,  BirdAnimation, "FLY", {
        x: 4,
        y: 14
    })

    const initGravityScale = 0.5;

    const changeAnimation = (name: string) => {
        const animation = ecs.getComponentMap<AnimationComponent>(BuiltInComName.ANIMATION).get(bird);
        if (animation) {
            animation.currentAnimationName = name;
        }
    }

    ecs.addComponent<GravityComponent>(bird, BuiltInComName.GRAVITY_ACCELERATION, {
        scale: initGravityScale,
    });

    ecs.addComponent<InputComponent>(bird, InputCompName, {
        onJump: () => {
            changeAnimation("FLY")
            ecs.getComponent<GravityComponent>(bird, BuiltInComName.GRAVITY_ACCELERATION)!.scale = initGravityScale;
        },
        onFalling: () => {
            changeAnimation("FALLING");
        }
    });

    ecs.addComponent<ColliderComponent>(bird, BuiltInComName.COLLISION, {
        size: {
            width: 7,
            height: 4,
        },
        onCollision: (_) => {
            // 取消重力加速度
            ecs.getComponentMap<GravityComponent>(BuiltInComName.GRAVITY_ACCELERATION).get(bird)!.scale = 0;

            // 取消速度
            ecs.getComponentMap<VelocityComponent>(BuiltInComName.VEL).get(bird)!.vy = 0;

            // 待机
            changeAnimation("IDLE")
        }
    })

    ecs.addComponent<VelocityComponent>(bird, BuiltInComName.VEL, {
        vx: 0,
        vy: 0
    });


}