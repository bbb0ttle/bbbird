import {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";
import {AnimationComponent, GravityComponent, VelocityComponent} from "../../BaseApp/Components";
import type {ECSManager, EntityId} from "../../BaseApp/ECS/ecs.ts";
import {createAnimation} from "./AnimationFactory.ts";
import {BirdAnimation} from "../Assets/Animations/bird.ts";
import {InputComponent} from "../Components/InputComponent.ts";
import {Position, Size} from "../../BaseApp/Core/types.ts";
import {HealthComponent} from "../Components/HelthComponent.ts";
import {GameState, GameStateComponent} from "../Components/GameStateComponent.ts";
import type {PreScreen} from "../../BaseApp/Core/Screen/preScreen.ts";
import {createPanel} from "./PanelFactory.ts";
import {WallFactory} from "./WallFactory.ts";
import {ScoreEntityType, ScoreUpdateComponent} from "../Components/ScoreUpdateComponent.ts";
import {DeathComponent} from "../Components/DeathComponent.ts";
import {PressRecycleComponent} from "../Components/PressRecycleComponent.ts";

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

    ecs.getOrAddComponent<DeathComponent>(bird, DeathComponent.name, {
        deathAnimation: "DIED",
        componentsNeedToRemoveAfterDeath: [
            InputComponent.name,
        ]
    })

    const changeAnimation = createAnimationUpdater(ecs, bird);

    ecs.getOrAddComponent<ScoreUpdateComponent>(bird, ScoreUpdateComponent.name, {
        Type: ScoreEntityType.Bird,
        Score: 0
    }).Score = 0;

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

    ecs.getOrAddComponent<ColliderComponent>(bird, ColliderComponent.name, {
        collisionCount: 0,
        fixed: false,
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
            }
        }
    }).collisionCount = 0


}

export const createBird = (ecs: ECSManager, screen: PreScreen, pos: Position): EntityId => {

    const bird = createAnimation(ecs,  BirdAnimation, "FLY", pos)

    const originPos = {
        ...pos
    }

    resetBird(ecs, bird, pos);

    ecs.addComponent<GameStateComponent>(bird, GameStateComponent.name, {
        state: GameState.Init,
        score: 0,
        onEnterPlaying: () => {
            WallFactory.GetInst(ecs, screen).createWalls();

            pos.x = originPos.x;
            pos.y = originPos.y;

            const v = ecs.getOrAddComponent<VelocityComponent>(bird, VelocityComponent.name, {
                vx: 0,
                vy: 0
            })

            v.vy = 0;

            resetBird(ecs, bird, pos);
        },
        onEnterGameOver: () => {
            WallFactory.GetInst(ecs, screen).destroy();

            const scoreCom = ecs.getComponent<ScoreUpdateComponent>(bird, ScoreUpdateComponent.name);

            createGameOverPanel(ecs, screen, scoreCom ? scoreCom.Score : 0);
        }
    })

    return bird;

}

const createGameOverPanel = (ecs: ECSManager, screen: PreScreen, score: number): EntityId => {
    const panel =createPanel(
        ecs,
        screen,
        "Game Over\n\nScore: " + score + "\n\nPress 'r' to restart",
        {
            width: 50,
            height: 8,
        },
        false,
        "Game Over"
    );

    ecs.addComponent<PressRecycleComponent>(panel, PressRecycleComponent.name, {
        pressedKey: new Set("r"),
    })

    return panel;
}