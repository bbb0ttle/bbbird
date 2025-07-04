import {type ECSManager, System} from "../../../BaseApp/ECS/ecs.ts";
import {InputManager} from "../../../BaseApp/Core/InputManager";
import {
    VelocityComponent
} from "../../../BaseApp/Components";
import {InputComponent} from "../../Components/InputComponent.ts";
import {autoRegisterSys} from "../../../BaseApp/ECS/decoractors.ts";
import type {PreScreen} from "../../../BaseApp/Core/Screen/preScreen.ts";

@autoRegisterSys([
    VelocityComponent.name,
    InputComponent.name,
])
export class InputSystem extends System {
    constructor(ecs: ECSManager, screen: PreScreen) {
        super(ecs, screen);
        this.inputManager = new InputManager(this.handleKeyUp);
    }

    private handleKeyUp = (key: string): void => {
        if (key === ' ') {
            this._wUnPressed = true;
        }
    }

    private _wUnPressed = false;

    private inputManager: InputManager;

    update(_: number): void {
        for (const e of this.entities) {
            const vel = this.getComponent<VelocityComponent>(e, VelocityComponent.name);
            const input = this.getComponent<InputComponent>(e, InputComponent.name);
            if (vel && input) {
                if (this.inputManager.isKeyPressed(' ')) {
                    vel.vy = -1 * input.jumpStep; // 向上移动 (模拟跳跃)

                    input.onJump();
                }
            }

            if (this._wUnPressed && vel) {
                vel.vy = 0;
                this._wUnPressed = false;
                input.onFalling();
            }
        }
    }
}