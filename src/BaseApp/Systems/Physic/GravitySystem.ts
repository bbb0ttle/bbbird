import {ECSManager, System} from "../../ECS/ecs.ts";
import {BuiltInComName, type GravityComponent, type VelocityComponent} from "../../Components";

export class GravitySystem extends System {
    private readonly GRAVITY_ACCELERATION: number = 980;

    override update(deltaTime: number) {
        for (const entity of this.entities) {
            const vel = this.getComponent<VelocityComponent>(entity, BuiltInComName.VEL)
            const gravity = this.getComponent<GravityComponent>(entity, BuiltInComName.GRAVITY_ACCELERATION);

            if (vel) {
                // 将重力加速度应用到垂直速度 (vy)
                vel.vy += this.GRAVITY_ACCELERATION * deltaTime * gravity.scale;
            }
        }
    }

    constructor(ecs: ECSManager) {
        super(ecs);
    }

}