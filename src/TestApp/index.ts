import {createFpsEntity} from "./Entities/FpsFactory.ts";
import {App} from "../BaseApp/Core/App";

// @ts-ignore
import * as BirdSystem from "./Systems/"

import {createBird} from "./Entities/BirdFactory.ts";
import {SpawnComponent} from "./Components/SpawnComponent.ts";
import {createWallEntity} from "./Entities/WallFactory.ts";
import {createPanel} from "./Entities/PanelFactory.ts";

export class TestApp extends App {
    constructor() {
        super();
    }

    override start() {
        super.start();

        createFpsEntity(this.ecsManager, {x: 0, y: 0})

        createBird(this.ecsManager, this.screen);

        createPanel(
            this.ecsManager,
            this.screen,
            "press 'space' to start\npress 'space' to jump\n\nthat's all.",
            {
                width: 50,
                height: 8,
            }
        )

        // const walls = this.ecsManager.createEntity();
        // this.ecsManager.addComponent<SpawnComponent>(walls, SpawnComponent.name, {
        //     onSpawn: () => {
        //         createWallEntity(
        //             this.ecsManager,
        //             this.screen,
        //         )
        //     },
        //     getSpawnInterval: () => {
        //         return Math.random() * 2 + 1.2
        //     }
        // });
    }
}
