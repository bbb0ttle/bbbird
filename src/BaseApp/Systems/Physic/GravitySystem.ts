import {System} from "../../ECS/ecs.ts";
import {GravityComponent, VelocityComponent} from "../../Components";
import {autoRegisterSys} from "../../ECS/decoractors.ts";

@autoRegisterSys([
    VelocityComponent.name,
    GravityComponent.name
])
export class GravitySystem extends System {
    private readonly GRAVITY_ACCELERATION: number = 980;

    override update(deltaTime: number) {
        for (const entity of this.entities) {
            const vel = this.getComponent<VelocityComponent>(entity, VelocityComponent.name)
            const gravity = this.getComponent<GravityComponent>(entity, GravityComponent.name);

            if (vel) {
                // 将重力加速度应用到垂直速度 (vy)
                vel.vy += this.GRAVITY_ACCELERATION * deltaTime * gravity.scale;
            }
        }
    }
}