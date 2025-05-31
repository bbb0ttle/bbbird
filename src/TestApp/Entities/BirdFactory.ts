import {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";
import {AnimationComponent, GravityComponent, VelocityComponent} from "../../BaseApp/Components";
import type {ECSManager, EntityId} from "../../BaseApp/ECS/ecs.ts";
import {createAnimation} from "./AnimationFactory.ts";
import {BirdAnimation} from "../Assets/Animations/bird.ts";
import {InputComponent} from "../Components/InputComponent.ts";
import {Position, Size} from "../../BaseApp/Core/types.ts";
import {HealthComponent} from "../Components/HelthComponent.ts";
import {GameState, GameStateComponent} from "../Components/GameStateComponent.ts";
import {SpawnComponent} from "../Components/SpawnComponent.ts";
import {createWallEntity} from "./WallFactory.ts";
import type {PreScreen} from "../../BaseApp/Core/Screen/preScreen.ts";
import {createPanel} from "./PanelFactory.ts";

const createAnimationUpdater = (ecs: ECSManager, bird: EntityId) => (name: string, durationPerFrame: number = 0.25) => {
    const animation = ecs.getComponentMap<AnimationComponent>(AnimationComponent.name).get(bird);

    if (animation) {
        animation.currentAnimationName = name;
        animation.frameDuration = durationPerFrame;
        animation.randomFrameDuration = name == "BLINK"
    }
}


const resetBird = (ecs: ECSManager, bird: EntityId, pos: Position) => {
    const birdSize = {
        width: 7,
        height: 5,
    }

    const initGravityScale = 0.1;
    const initVelocityY = 50;

    const p = ecs.getOrAddComponent<Position>(bird, Position.name, pos);
    p.x = pos.x;
    p.y = pos.y;

    ecs.getOrAddComponent<HealthComponent>(bird, HealthComponent.name, {
        health: 1
    }).health = 1;

    const changeAnimation = createAnimationUpdater(ecs, bird);

    ecs.getOrAddComponent<GravityComponent>(bird, GravityComponent.name, {
        scale: initGravityScale,
    });

    ecs.getOrAddComponent<InputComponent>(bird, InputComponent.name, {
        onJump: () => {
            changeAnimation("FLY")
            ecs.getComponent<GravityComponent>(bird, GravityComponent.name)!.scale = initGravityScale;
        },
        onFalling: () => {
            // changeAnimation("FALLING");
        },
        jumpStep: initVelocityY
    });

    ecs.getOrAddComponent<VelocityComponent>(bird, VelocityComponent.name, {
        vx: 0,
        vy: 0
    });

    ecs.getOrAddComponent<Size>(bird, Size.name, birdSize);

    changeAnimation("BLINK", 0.4);

}

export const createBird = (ecs: ECSManager, screen: PreScreen, pos: Position, panel: EntityId): EntityId => {

    const bird = createAnimation(ecs,  BirdAnimation, "FLY", pos)

    const changeAnimation = createAnimationUpdater(ecs, bird);

    const originPos = {
        ...pos
    }

    resetBird(ecs, bird, pos);

    ecs.addComponent<ColliderComponent>(bird, ColliderComponent.name, {
        onCollision: (_) => {
            const state = ecs.getComponent<GameStateComponent>(bird, GameStateComponent.name)!.state;

            if (state === GameState.Init) {
                changeAnimation("BLINK", 0.4)
                const v = ecs.getOrAddComponent<VelocityComponent>(bird, VelocityComponent.name, {
                    vx: 0,
                    vy: 0
                })

                v.vy = 0;
                ecs.removeComponent(bird, VelocityComponent.name);
            } else if (state === GameState.Playing) {
                changeAnimation("DIED", 1);
                const health = ecs.getComponentMap<HealthComponent>(HealthComponent.name).get(bird)!;
                health.health -= 1;
            }
        }
    })

    const walls = ecs.createEntity();
    const wallSet: EntityId[] = [];

    let gameOverPanel: EntityId;

    ecs.addComponent<GameStateComponent>(bird, GameStateComponent.name, {
        state: GameState.Init,
        score: 0,
        onEnterPlaying: () => {
            ecs.destroyEntity(panel);

            if (gameOverPanel) {
                ecs.destroyEntity(gameOverPanel);
            }

            pos.x = originPos.x;
            pos.y = originPos.y;

            const v = ecs.getOrAddComponent<VelocityComponent>(bird, VelocityComponent.name, {
                vx: 0,
                vy: 0
            })

            v.vy = 0;

            resetBird(ecs, bird, pos);

            ecs.addComponent<SpawnComponent>(walls, SpawnComponent.name, {
                onSpawn: () => {
                    wallSet.push(...createWallEntity(
                        ecs,
                        screen,
                    ));
                },
                getSpawnInterval: () => {
                    return Math.random() * 2 + 1.2
                }
            });
        },
        onEnterGameOver: () => {
            ecs.removeComponent(walls, SpawnComponent.name)

            wallSet.forEach((wall) => {
                ecs.destroyEntity(wall)
            })

            ecs.removeComponent(bird, InputComponent.name);

            changeAnimation("DIED", 1);

            gameOverPanel = createPanel(
                ecs,
                screen,
                "Score: " + 0 + "\n\npress 'r' to restart",
                {
                    width: 50,
                    height: 8,
                },
                false,
                "Game Over"
            )
        }
    })

    return bird;

}