import {ECSManager, System} from "../../ECS/ecs.ts";
import type {Picture, Position} from "../../Core/types.ts";
import {BuiltInComName} from "../../Components";
import type {PreScreen} from "../../Core/Screen/preScreen.ts";

export class PictureRenderSystem extends System {
    update(_: number): void {
        for (const e of this.entities) {
            const pos = this.getComponent<Position>(e, BuiltInComName.POS)
            const picture = this.getComponent<Picture>(e, BuiltInComName.PIC);

            if (pos && picture) {
                this.screen.DrawPicture(picture, pos)
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