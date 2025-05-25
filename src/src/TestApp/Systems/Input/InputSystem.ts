import {type ECSManager, System} from "../../../BaseApp/ECS/ecs.ts";
import {InputManager} from "../../../BaseApp/Core/InputManager";
import {BuiltInComName, type VelocityComponent} from "../../../BaseApp/Components";

export class InputSystem extends System {
    constructor(ecs: ECSManager) {
        super(ecs);
    }

    private inputManager: InputManager = InputManager.getInst();

    update(_: number): void {
        for (const e of this.entities) {
            const vel = this.getComponent<VelocityComponent>(e, BuiltInComName.VEL);
            if (vel) {
                if (this.inputManager.isKeyPressed('w')) {
                    vel.vy = -100; // 向上移动 (模拟跳跃)
                } else {
                    vel.vy = 0;
                }
            }
        }
    }
}