import { ECSManager, System} from "../../ECS/ecs.ts";
import type {PreScreen} from "../../Core/Screen/preScreen.ts";
import type {Position} from "../../Core/Screen/tyes.ts";
import {BuiltInComName, type TextCom} from "../../Core/App";

export class PlainRenderSystem extends System {
    // @ts-ignore
    update(deltaTime: number): void {
        this.screen.Clear();

        for (const e of this.entities) {
            const pos = this.ecs.getComponentMap<Position>(BuiltInComName.POS).get(e);
            const textCom = this.ecs.getComponentMap<TextCom>(BuiltInComName.TEXT_PLAIN).get(e);

            if (pos && textCom) {
                this.screen.DrawPlainText(textCom.text, pos);
            }
        }
    }

    screen: PreScreen;
    ecs: ECSManager;

    public constructor(
        screen: PreScreen,
        ecs: ECSManager,
    ) {
        super();
        this.ecs = ecs;
        this.screen = screen;
    }
}
