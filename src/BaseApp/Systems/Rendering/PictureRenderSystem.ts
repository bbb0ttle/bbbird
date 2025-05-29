import {System} from "../../ECS/ecs.ts";
import {Picture, Position} from "../../Core/types.ts";
import {autoRegisterSys} from "../../ECS/decoractors.ts";

@autoRegisterSys([
    Position.name,
    Picture.name
])
export class PictureRenderSystem extends System {
    update(_: number): void {
        for (const e of this.entities) {
            const pos = this.getComponent<Position>(e, Position.name);
            const picture = this.getComponent<Picture>(e, Picture.name);

            if (pos && picture) {
                this.screen.DrawPicture(picture, pos)
            }
        }
    }
}