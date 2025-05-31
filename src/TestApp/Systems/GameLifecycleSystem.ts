import {ECSManager, System} from "../../BaseApp/ECS/ecs.ts";
import {autoRegisterSys} from "../../BaseApp/ECS/decoractors.ts";
import type {PreScreen} from "../../BaseApp/Core/Screen/preScreen.ts";
import {InputManager} from "../../BaseApp/Core/InputManager";
import {GameState, GameStateComponent} from "../Components/GameStateComponent.ts";
import {HealthComponent} from "../Components/HelthComponent.ts";

@autoRegisterSys([
    GameStateComponent.name,
    HealthComponent.name,
])
export class GameLifecycleSystem extends System {
    public constructor(ecs: ECSManager, screen: PreScreen) {
        super(ecs, screen);
    }

    private inputManager: InputManager = new InputManager();

    public update(_: number): void {
        for (const e of this.entities) {
            const stateCom= this.ecs.getComponent<GameStateComponent>(e, GameStateComponent.name);
            const healthCom = this.ecs.getComponent<HealthComponent>(e, HealthComponent.name);

            if (!stateCom || !healthCom) {
                continue;
            }

            if (stateCom.state == GameState.Init && this.inputManager.isKeyPressed(" ")) {
                healthCom.health = 1;
                stateCom.state = GameState.Playing;
                stateCom.onEnterPlaying();
            }

            if (stateCom.state == GameState.Playing) {
                if (healthCom.health <= 0) {
                    stateCom.state = GameState.GameOver;
                    stateCom.onEnterGameOver();
                }
            }
        }
    }
}