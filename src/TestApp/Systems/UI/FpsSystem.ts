import {System} from "../../../BaseApp/ECS/ecs.ts";
import {FpsCom} from "../../Components/FpsComponent.ts";
import {TextCom} from "../../../BaseApp/Components";
import {autoRegisterSys} from "../../../BaseApp/ECS/decoractors.ts";
import {Position} from "../../../BaseApp/Core/types.ts";

@autoRegisterSys([
    Position.name,
    TextCom.name,
    FpsCom.name
])
export class FPSSystem extends System {
    update(deltaTime: number): void {
        for (const e of this.entities) {
            const fps = this.getComponent<FpsCom>(e, FpsCom.name);
            let textCom = this.getComponent<TextCom>(e, TextCom.name);

            const fpsValue = (1 / deltaTime).toFixed(2);

            if (fps && textCom) {
                fps.value = 1 / deltaTime;
                textCom.text = `fps: ${fpsValue}`;
            }
        }
    }
}
