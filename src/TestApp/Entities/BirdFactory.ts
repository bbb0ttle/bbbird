import {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";
import {AnimationComponent, GravityComponent, VelocityComponent} from "../../BaseApp/Components";
import type {ECSManager, EntityId} from "../../BaseApp/ECS/ecs.ts";
import {createAnimation} from "./AnimationFactory.ts";
import {BirdAnimation} from "../Assets/Animations/bird.ts";
import {InputComponent} from "../Components/InputComponent.ts";
import {Position, Size} from "../../BaseApp/Core/types.ts";
import {AutoRecycleComponent} from "../Components/AutoRecycleComponent.ts";
import {HealthComponent} from "../Components/HelthComponent.ts";
import {GameState, GameStateComponent} from "../Components/GameStateComponent.ts";
import {SpawnComponent} from "../Components/SpawnComponent.ts";
import {createWallEntity} from "./WallFactory.ts";
import type {PreScreen} from "../../BaseApp/Core/Screen/preScreen.ts";
import {createPanel} from "./PanelFactory.ts";

export const createBird = (ecs: ECSManager, screen: PreScreen, pos: Position, panel: EntityId): EntityId => {

    const birdSize = {
        width: 7,
        height: 5,
    }
    const bird = createAnimation(ecs,  BirdAnimation, "FLY", pos)

    const initGravityScale = 0.1;
    const initVelocityY = 50;

    const changeAnimation = (name: string, durationPerFrame: number = 0.25) => {
        const animation = ecs.getComponentMap<AnimationComponent>(AnimationComponent.name).get(bird);
    
        if (animation) {
            animation.currentAnimationName = name;
            animation.frameDuration = durationPerFrame;
            animation.randomFrameDuration = name == "BLINK"
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
        jumpStep: initVelocityY
    });


    ecs.addComponent<Size>(bird, Size.name, birdSize);

    ecs.addComponent<AutoRecycleComponent>(bird, AutoRecycleComponent.name, {})

    ecs.addComponent<ColliderComponent>(bird, ColliderComponent.name, {
        onCollision: (_) => {
            const state = ecs.getComponentMap<GameStateComponent>(GameStateComponent.name).get(bird)!.state;

            // 取消重力加速度
            ecs.getComponentMap<GravityComponent>( GravityComponent.name).get(bird)!.scale = 0;

            // 取消速度
            ecs.getComponentMap<VelocityComponent>(VelocityComponent.name).get(bird)!.vy = 0;

            if (state === GameState.Init) {
                changeAnimation("BLINK", 0.4)
            } else if (state === GameState.Playing) {
                changeAnimation("DIED", 1);
                const health = ecs.getComponentMap<HealthComponent>(HealthComponent.name).get(bird)!;
                health.health -= 1;
            }
        }
    })

    ecs.addComponent<VelocityComponent>(bird, VelocityComponent.name, {
        vx: 0,
        vy: 0
    });

    ecs.addComponent<HealthComponent>(bird, HealthComponent.name, {
        health: 1
    })

    ecs.addComponent<GameStateComponent>(bird, GameStateComponent.name, {
        state: GameState.Init,
        score: 0,
        onEnterPlaying: () => {
            ecs.destroyEntity(panel);

            ecs.getComponentMap<GravityComponent>( GravityComponent.name).get(bird)!.scale = initGravityScale;

            ecs.getComponentMap<VelocityComponent>(VelocityComponent.name).get(bird)!.vy = initVelocityY;

            const walls = ecs.createEntity();
            ecs.addComponent<SpawnComponent>(walls, SpawnComponent.name, {
                onSpawn: () => {
                    createWallEntity(
                        ecs,
                        screen,
                    )
                },
                getSpawnInterval: () => {
                    return Math.random() * 2 + 1.2
                }
            });
        },
        onEnterGameOver: () => {
            createPanel(
                ecs,
                screen,
                "GameOver\nScore: " + 0 + "\n\npress 'space' to restart",
                {
                    width: 50,
                    height: 8,
                }
            )
        }
    })

    return bird;

}