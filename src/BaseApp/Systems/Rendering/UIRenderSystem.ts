import {System} from "../../ECS/ecs.ts";
import {autoRegisterSys} from "../../ECS/decoractors.ts";
import {UICom} from "../../Components/UI/PanelCom.ts";
import {Picture, Position, Size} from "../../Core/types.ts";

@autoRegisterSys([
    UICom.name,
    Position.name,
    Picture.name
])
export class UIRenderSystem extends System {
    public update(_: number): void {
        for (const e of this.entities) {
            const panelCom = this.getComponent<UICom>(e, UICom.name);
            const pos = this.getComponent<Position>(e, Position.name);
            const size = this.getComponent<Size>(e, Size.name);
            const picture = this.getComponent<Picture>(e, Picture.name);
            if (panelCom && panelCom.Visible && pos && size && picture) {
                this.screen.DrawPicture(picture, pos);
            }
        }
    }

}