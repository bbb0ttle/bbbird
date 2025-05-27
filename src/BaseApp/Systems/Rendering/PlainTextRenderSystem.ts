import { System} from "../../ECS/ecs.ts";
import type {Position} from "../../Core/types.ts";
import {BuiltInComName, type TextCom} from "../../Components";
import {autoRegisterSys} from "../../ECS/decoractors.ts";

@autoRegisterSys([
    BuiltInComName.POS,
    BuiltInComName.TEXT_PLAIN,
])
export class PlainRenderSystem extends System {
    // @ts-ignore
    update(deltaTime: number): void {
        for (const e of this.entities) {
            const pos = this.getComponent<Position>(e, BuiltInComName.POS);
            const textCom = this.getComponent<TextCom>(e, BuiltInComName.TEXT_PLAIN);

            if (pos && textCom) {
                this.screen.DrawPlainText(textCom.text, pos);
            }
        }
    }
}
