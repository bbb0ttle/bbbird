import { System} from "../../ECS/ecs.ts";
import {Position} from "../../Core/types.ts";
import {TextCom} from "../../Components";
import {autoRegisterSys} from "../../ECS/decoractors.ts";

@autoRegisterSys([
    Position.name,
    TextCom.name
])
export class DotMatrixTextRenderSystem extends System {
    update(_: number): void {
        for (const e of this.entities) {
            const pos = this.getComponent<Position>(e, Position.name);
            const textCom = this.getComponent<TextCom>(e, TextCom.name);

            if (pos && textCom) {
                if (textCom.isPlain) {
                    this.screen.DrawPlainText(textCom.text, pos);
                } else {
                    this.screen.DrawText(textCom.text, pos);
                }
            }
        }
    }
}
