import {type ECSManager, System} from "../../../BaseApp/ECS/ecs.ts";
import {InputManager} from "../../../BaseApp/Core/InputManager";
import {
    BuiltInComName,
    type VelocityComponent
} from "../../../BaseApp/Components";
import {InputCompName, type InputComponent} from "../../Components/InputComponent.ts";

export class InputSystem extends System {
    constructor(ecs: ECSManager) {
        super(ecs);

        this.inputManager = new InputManager(this.handleKeyUp);
    }

    private handleKeyUp = (key: string): void => {
        if (key === 'w') {
            this._wUnPressed = true;
        }
    }

    private _wUnPressed = false;

    private inputManager: InputManager;

    update(_: number): void {
        for (const e of this.entities) {
            const vel = this.getComponent<VelocityComponent>(e, BuiltInComName.VEL);
            const input = this.getComponent<InputComponent>(e, InputCompName);
            if (vel && input) {
                if (this.inputManager.isKeyPressed('w')) {
                    vel.vy = -100; // 向上移动 (模拟跳跃)

                    input.onJump();
                }
            }

            if (this._wUnPressed) {
                vel.vy = 0;
                this._wUnPressed = false;
                input.onFalling();
            }
        }
    }
}