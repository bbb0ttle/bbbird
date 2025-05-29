import {System} from "../../ECS/ecs.ts";
import {BuiltInComName, VelocityComponent} from "../../Components";
import type {Position} from "../../Core/types.ts";
import {autoRegisterSys} from "../../ECS/decoractors.ts";

@autoRegisterSys([
    BuiltInComName.POS,
    VelocityComponent.name,
])
export class MovementSystem extends System {

    update(deltaTime: number): void {
        for (const entity of this.entities) {
            const pos = this.getComponent<Position>(entity, BuiltInComName.POS);
            const vel = this.getComponent<VelocityComponent>(entity, VelocityComponent.name);

            if (pos && vel) {
                pos.x += vel.vx * deltaTime;
                pos.y +=  vel.vy * deltaTime;
            }
        }
    }
}