import {System} from "../../ECS/ecs.ts";
import {type Picture, Position} from "../../Core/types.ts";
import {BuiltInComName} from "../../Components";
import {autoRegisterSys} from "../../ECS/decoractors.ts";

@autoRegisterSys([
    Position.name,
    BuiltInComName.PIC
])
export class PictureRenderSystem extends System {
    update(_: number): void {
        for (const e of this.entities) {
            const pos = this.getComponent<Position>(e, Position.name);
            const picture = this.getComponent<Picture>(e, BuiltInComName.PIC);

            if (pos && picture) {
                this.screen.DrawPicture(picture, pos)
            }
        }
    }
}