import {System} from "../../BaseApp/ECS/ecs.ts";
import {autoRegisterSys} from "../../BaseApp/ECS/decoractors.ts";
import {HealthComponent} from "../Components/HelthComponent.ts";
import {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";

@autoRegisterSys([
    HealthComponent.name,
    ColliderComponent.name
])
export class HealthSystem extends System {
    update(_: number): void {
        for (const e of this.entities) {
            const healthCom = this.ecs.getComponent<HealthComponent>(e, HealthComponent.name);
            const colliderCom = this.ecs.getComponent<ColliderComponent>(e, ColliderComponent.name);

            if (!healthCom || !colliderCom) {
                continue;
            }

            // 如果碰撞计数大于0，表示有碰撞发生
            if (colliderCom.collisionCount && colliderCom.collisionCount > 0) {
                healthCom.health -= 1; // 每次碰撞减少1点生命值
                colliderCom.collisionCount = 0; // 重置碰撞计数
            }

            // 如果生命值小于等于0，执行死亡逻辑
            if (healthCom.health <= 0) {
                console.log(`Entity ${e} has died.`);
                // 可以在这里添加更多的死亡处理逻辑，比如触发事件、播放动画等
            }
        }

    }


}