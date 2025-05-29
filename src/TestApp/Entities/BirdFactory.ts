import {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";
import {
    AnimationComponent,
    GravityComponent,
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
        height: 5,
    }
    const centerX = Math.floor((screen.width - birdSize.width) / 4);
    const bird = createAnimation(ecs,  BirdAnimation, "FLY", {
        x: centerX,
        y: 0
    })

    const initGravityScale = 0.1;

    const changeAnimation = (name: string, durationPerFrame: number = 0.25) => {
        const animation = ecs.getComponentMap<AnimationComponent>(AnimationComponent.name).get(bird);
    
        if (animation) {
            animation.currentAnimationName = name;
            animation.frameDuration = durationPerFrame;
        }
    }

    ecs.addComponent<GravityComponent>(bird, GravityComponent.name, {
        scale: initGravityScale,
    });

    ecs.addComponent<InputComponent>(bird, InputComponent.name, {
        onJump: () => {
            changeAnimation("FLY")
            ecs.getComponent<GravityComponent>(bird, GravityComponent.name)!.scale = initGravityScale;
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
            ecs.getComponentMap<GravityComponent>( GravityComponent.name).get(bird)!.scale = 0;

            // 取消速度
            ecs.getComponentMap<VelocityComponent>(VelocityComponent.name).get(bird)!.vy = 0;

            // 待机
            changeAnimation("IDLE", 0.25)
        }
    })

    ecs.addComponent<VelocityComponent>(bird, VelocityComponent.name, {
        vx: 0,
        vy: 0
    });


}