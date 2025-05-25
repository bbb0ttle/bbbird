import { ECSManager, System} from "../../ECS/ecs.ts";
import type {PreScreen} from "../../Core/Screen/preScreen.ts";
import type {Position} from "../../Core/Screen/tyes.ts";
import {BuiltInComName} from "../../Components";
import type {TextCom} from "../../Components/Rendering/TextComponent.ts";

export class DotMatrixTextRenderSystem extends System {
    // @ts-ignore
    update(deltaTime: number): void {
        this.screen.Clear();

        for (const e of this.entities) {
            const pos = this.getComponent<Position>(e, BuiltInComName.POS)
            const textCom = this.getComponent<TextCom>(e, BuiltInComName.TEXT_MAT);

            if (pos && textCom) {
                this.screen.DrawText(textCom.text, pos);
            }
        }
    }

    screen: PreScreen;

    public constructor(
        screen: PreScreen,
        ecs: ECSManager,
    ) {
        super(ecs);
        this.screen = screen;
    }
}
