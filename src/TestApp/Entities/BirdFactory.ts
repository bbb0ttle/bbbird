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
import type {Size} from "../../BaseApp/Core/types.ts";
import {AutoRecycleComponent} from "../Components/AutoRecycleComponent.ts";
import type {PreScreen} from "../../BaseApp/Core/Screen/preScreen.ts";

export const createBird = (ecs: ECSManager, screen: PreScreen) => {

    const birdSize = {
        width: 7,
        height: 4,
    }
    const centerX = Math.floor((screen.width - birdSize.width) / 2) - birdSize.width;
    const bird = createAnimation(ecs,  BirdAnimation, "FLY", {
        x: centerX,
        y: 14
    })

    const initGravityScale = 0.1;

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
            // changeAnimation("FALLING");
        },
        jumpStep: 50
    });


    ecs.addComponent<Size>(bird, BuiltInComName.SIZE, birdSize);

    ecs.addComponent<AutoRecycleComponent>(bird, AutoRecycleComponent.name, {})

    ecs.addComponent<ColliderComponent>(bird, BuiltInComName.COLLISION, {
        size: birdSize,
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