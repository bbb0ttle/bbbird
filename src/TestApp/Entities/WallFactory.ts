import {type Picture, Position, Size} from "../../BaseApp/Core/types.ts";
import {ECSManager} from "../../BaseApp/ECS/ecs.ts";
import type {PreScreen} from "../../BaseApp/Core/Screen/preScreen.ts";
import {BuiltInComName, VelocityComponent} from "../../BaseApp/Components";
import {AutoRecycleComponent} from "../Components/AutoRecycleComponent.ts";

export const createWallEntity = (
    ecs: ECSManager,
    screen: PreScreen,
    shape: string = "<",
) => {
    const holeHeight = 15;
    const wallWidth = 4;

    const totalVisibleHeight = screen.height - holeHeight;
    if (totalVisibleHeight <= 0) {
        throw new Error("Hole height is too large for the screen height.");
    }

    // random from 1 to totalVisibleHeight;
    const topWallHeight: number = Math.floor(Math.random() * (totalVisibleHeight - 1)) + 1;
    const bottomWallHeight: number = totalVisibleHeight - topWallHeight;

    const createWallByHeight = (h: number) => {
        const eid = ecs.createEntity();
        const brick = Array.from({ length: wallWidth}, () => shape);
        const wall = Array.from({ length: h }, () => brick);

        ecs.addComponent<Picture>(eid, BuiltInComName.PIC, wall);

        ecs.addComponent<VelocityComponent>(eid, VelocityComponent.name, {
            vx: -12.5,
            vy: 0
        })

        ecs.addComponent<AutoRecycleComponent>(eid, AutoRecycleComponent.name, {});

        return eid;
    }

    const topWallEntity = createWallByHeight(topWallHeight);
    ecs.addComponent<Position>(topWallEntity, Position.name, {
        x: screen.width - wallWidth,
        y: 0
    });

    ecs.addComponent<Size>(topWallEntity, Size.name, {
        height: topWallHeight,
        width: wallWidth,
    })

    const bottomWallEntity = createWallByHeight(bottomWallHeight);
    ecs.addComponent<Position>(bottomWallEntity, Position.name, {
        x: screen.width - wallWidth,
        y: topWallHeight + holeHeight
    });

    ecs.addComponent<Size>(bottomWallEntity, Size.name, {
        height: bottomWallHeight,
        width: wallWidth,
    });
}