import {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";
import {
    type AnimationComponent,
    BuiltInComName,
    type GravityComponent,
    VelocityComponent
} from "../../BaseApp/Components";
import type {ECSManager} from "../../BaseApp/ECS/ecs.ts";
import {createAnimation} from "./AnimationFactory.ts";
import {BirdAnimation} from "../Assets/Animations/bird.ts";
import {InputComponent} from "../Components/InputComponent.ts";
import {Size} from "../../BaseApp/Core/types.ts";
import {AutoRecycleComponent} from "../Components/AutoRecycleComponent.ts";
import type {PreScreen} from "../../BaseApp/Core/Screen/preScreen.ts";

export const createBird = (ecs: ECSManager, screen: PreScreen) => {

    const birdSize = {
        width: 7,
        height: 4,
    }
    const centerX = Math.floor((screen.width - birdSize.width) / 4);
    const bird = createAnimation(ecs,  BirdAnimation, "FLY", {
        x: centerX,
        y: 14
    })

    const initGravityScale = 0.1;

    const changeAnimation = (name: string, durationPerFrame: number = 0.25) => {
        const animation = ecs.getComponentMap<AnimationComponent>(BuiltInComName.ANIMATION).get(bird);
    
        if (animation) {
            animation.currentAnimationName = name;
            animation.frameDuration = durationPerFrame;
        }
    }

    ecs.addComponent<GravityComponent>(bird, BuiltInComName.GRAVITY_ACCELERATION, {
        scale: initGravityScale,
    });

    ecs.addComponent<InputComponent>(bird, InputComponent.name, {
        onJump: () => {
            changeAnimation("FLY")
            ecs.getComponent<GravityComponent>(bird, BuiltInComName.GRAVITY_ACCELERATION)!.scale = initGravityScale;
        },
        onFalling: () => {
            // changeAnimation("FALLING");
        },
        jumpStep: 50
    });


    ecs.addComponent<Size>(bird, Size.name, birdSize);

    ecs.addComponent<AutoRecycleComponent>(bird, AutoRecycleComponent.name, {})

    ecs.addComponent<ColliderComponent>(bird, ColliderComponent.name, {
        onCollision: (_) => {
            // 取消重力加速度
            ecs.getComponentMap<GravityComponent>(BuiltInComName.GRAVITY_ACCELERATION).get(bird)!.scale = 0;

            // 取消速度
            ecs.getComponentMap<VelocityComponent>(VelocityComponent.name).get(bird)!.vy = 0;

            // 待机
            changeAnimation("DIED", 0.1)
        }
    })

    ecs.addComponent<VelocityComponent>(bird, VelocityComponent.name, {
        vx: 0,
        vy: 0
    });


}