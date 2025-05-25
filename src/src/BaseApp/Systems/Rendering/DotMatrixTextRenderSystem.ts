import { ECSManager, System} from "../../ECS/ecs.ts";
import type {PreScreen} from "../../Core/Screen/preScreen.ts";
import type {Position} from "../../Core/Screen/tyes.ts";
import type {TextCom} from "../../Core/App";

export class DotMatrixTextRenderSystem extends System {
    // @ts-ignore
    update(deltaTime: number): void {
        this.screen.Clear();

        for (const e of this.entities) {
            const pos = this.ecs.getComponentMap<Position>("position").get(e);
            const textCom = this.ecs.getComponentMap<TextCom>("dottedText").get(e);

            if (pos && textCom) {
                this.screen.DrawText(textCom.text, pos);
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
