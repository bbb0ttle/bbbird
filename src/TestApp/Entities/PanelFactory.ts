import {Picture, Position, Size} from "../../BaseApp/Core/types.ts";
import type {ECSManager} from "../../BaseApp/ECS/ecs.ts";
import type {PreScreen} from "../../BaseApp/Core/Screen/preScreen.ts";
import {UICom} from "../../BaseApp/Components/UI/PanelCom.ts";
import {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";

export const createPanel = (
    ecs: ECSManager,
    screen: PreScreen,
    content: string,
    size: Size,
) => {
    const panel = ecs.createEntity();

    ecs.addComponent<UICom>(panel, UICom.name, {
        Visible: true
    })

    const border = "-".repeat(size.width - 2).split("");
    const corner = "+";

    const middle = content.split("\n").map(line => {
        const spaceWidth = size.width - line.length - 2;

        const leftPadding = Math.floor(spaceWidth / 2);
        const rightPadding = spaceWidth - leftPadding;

        return "|" + " ".repeat(leftPadding) + line + " ".repeat(rightPadding) + "|";
    });

    const paddingTopLen = Math.floor((size.height - middle.length - 2) / 2);
    const paddingBottomLen = size.height - middle.length - 2 - paddingTopLen;

    const paddingTop = Array(paddingTopLen).fill("|" + " ".repeat(size.width - 2) + "|");
    const paddingBottom = Array(paddingBottomLen).fill("|" + " ".repeat(size.width - 2) + "|");

    ecs.addComponent(panel, Picture.name, new Picture([
        [corner, ...border, corner],
        ...paddingTop,
        ...middle,
        ...paddingBottom,
        [corner, ...border, corner]
    ]))

    ecs.addComponent(panel, Position.name, screen.GetCenterPosFor(size));

    ecs.addComponent(panel, ColliderComponent.name, new ColliderComponent())

    ecs.addComponent(panel, Size.name, size);
}