import {System} from "../../BaseApp/ECS/ecs.ts";
import {PressRecycleComponent} from "../Components/PressRecycleComponent.ts";
import {InputManager} from "../../BaseApp/Core/InputManager";
import {autoRegisterSys} from "../../BaseApp/ECS/decoractors.ts";

@autoRegisterSys([
    PressRecycleComponent.name
])
export class PressRecycleSystem extends System {
    private inputManager: InputManager = new InputManager();
    update(_: number): void {
        for (const e of this.entities) {
            const pressCom = this.getComponent<PressRecycleComponent>(e, PressRecycleComponent.name);
            if (pressCom && pressCom.pressedKey.size) {
                pressCom.pressedKey.forEach((key: string) => {
                    if (this.inputManager.isKeyPressed(key)) {
                        this.ecs.destroyEntity(e);
                    }
                })
            }
        }
    }
}