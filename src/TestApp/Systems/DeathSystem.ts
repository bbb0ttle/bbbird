import {System} from "../../BaseApp/ECS/ecs.ts";
import {autoRegisterSys} from "../../BaseApp/ECS/decoractors.ts";
import {HealthComponent} from "../Components/HelthComponent.ts";
import {DeathComponent} from "../Components/DeathComponent.ts";
import {AnimationComponent} from "../../BaseApp/Components";

@autoRegisterSys([
    HealthComponent.name,
    DeathComponent.name,
    AnimationComponent.name,
])
export class DeathSystem extends System {
    public update(_: number): void {
        for (const e of this.entities) {
            const deathCom = this.ecs.getComponent<DeathComponent>(e, DeathComponent.name);
            const healthCom = this.ecs.getComponent<HealthComponent>(e, HealthComponent.name);


            if (!deathCom || !healthCom) {
                continue;
            }

            // 检查生命值是否小于等于0
            if (healthCom.health <= 0) {
                const animationCom = this.ecs.getComponent<AnimationComponent>(e, AnimationComponent.name);
                if (animationCom) {
                    animationCom.currentAnimationName = deathCom.deathAnimation; // 切换到死亡动画
                }

                deathCom.componentsNeedToRemoveAfterDeath.forEach((com) => {
                    this.ecs.removeComponentsByType(com);
                })
            }

        }
    }
}