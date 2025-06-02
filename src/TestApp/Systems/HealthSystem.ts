import {System} from "../../BaseApp/ECS/ecs.ts";
import {autoRegisterSys} from "../../BaseApp/ECS/decoractors.ts";
import {HealthComponent} from "../Components/HelthComponent.ts";
import {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";
import {GameState, GameStateComponent} from "../Components/GameStateComponent.ts";

@autoRegisterSys([
    HealthComponent.name,
    ColliderComponent.name,
    GameStateComponent.name
])
export class HealthSystem extends System {
    update(_: number): void {
        for (const e of this.entities) {
            const healthCom = this.ecs.getComponent<HealthComponent>(e, HealthComponent.name);
            const colliderCom = this.ecs.getComponent<ColliderComponent>(e, ColliderComponent.name);
            const gameStateCom = this.ecs.getComponent<GameStateComponent>(e, GameStateComponent.name);

            if (!healthCom || !colliderCom || !gameStateCom) {
                continue;
            }

            if (gameStateCom.state != GameState.Playing) {
                return;
            }

            // 如果碰撞计数大于0，表示有碰撞发生
            if (colliderCom.collisionCount && colliderCom.collisionCount > 0) {
                healthCom.health -= 1; // 每次碰撞减少1点生命值
                colliderCom.collisionCount = 0; // 重置碰撞计数
            }
        }

    }


}