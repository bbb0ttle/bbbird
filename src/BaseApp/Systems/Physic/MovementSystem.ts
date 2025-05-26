import {ECSManager, System} from "../../ECS/ecs.ts";
import {BuiltInComName} from "../../Components";
import type {Position} from "../../Core/types.ts";
import type {VelocityComponent} from "../../Components/Physic/VelocityComponent.ts";

export class MovementSystem extends System {

    update(deltaTime: number): void {
        for (const entity of this.entities) {
            const pos = this.getComponent<Position>(entity, BuiltInComName.POS);
            const vel = this.getComponent<VelocityComponent>(entity, BuiltInComName.VEL);

            if (pos && vel) {
                pos.x += vel.vx * deltaTime;
                pos.y +=  vel.vy * deltaTime;
            }
        }
    }

    public constructor(
        ecs: ECSManager,
    ) {
        super(ecs);
    }

}