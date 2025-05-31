import {Picture, Position, Size} from "../../BaseApp/Core/types.ts";
import type {ECSManager, EntityId} from "../../BaseApp/ECS/ecs.ts";
import type {PreScreen} from "../../BaseApp/Core/Screen/preScreen.ts";
import {UICom} from "../../BaseApp/Components/UI/PanelCom.ts";
import {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";
import {strCompletion} from "../../BaseApp/Utils/StrHelper.ts";

export const createPanel = (
    ecs: ECSManager,
    screen: PreScreen,
    content: string,
    size: Size,
    collider: boolean,
    title?: string
): EntityId => {
    const panel = ecs.createEntity();

    ecs.addComponent<UICom>(panel, UICom.name, {
        Visible: true
    })

    const border = "-".repeat(size.width - 2).split("");
    const corner = "+";

    const middle = content.split("\n").map(line => {
        return "|" + strCompletion(line, size.width - 2, " ") + "|";
    });


    const paddingTopLen = Math.floor((size.height - middle.length - 2) / 2);
    const paddingBottomLen = size.height - middle.length - 2 - paddingTopLen;

    const paddingTop = Array(paddingTopLen).fill("|" + " ".repeat(size.width - 2) + "|");
    const paddingBottom = Array(paddingBottomLen).fill("|" + " ".repeat(size.width - 2) + "|");

    ecs.addComponent(panel, Picture.name, new Picture([
        [corner, ...strCompletion(title ? `[ ${title} ]` : "", size.width - 2, "-"), corner],
        ...paddingTop,
        ...middle,
        ...paddingBottom,
        [corner, ...border, corner]
    ]))

    ecs.addComponent(panel, Position.name, screen.GetCenterPosFor(size));

    ecs.addComponent(panel, Size.name, size);

    if (collider) {
        const c = new ColliderComponent();
        c.fixed = true;
        ecs.addComponent(panel, ColliderComponent.name, c)
    }


    return panel;
}