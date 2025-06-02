import {createFpsEntity} from "./Entities/FpsFactory.ts";
import {App} from "../BaseApp/Core/App";

// @ts-ignore
import * as BirdSystem from "./Systems/"
import {createBird} from "./Entities/BirdFactory.ts";
import {createGameStartPanel} from "./Entities/PanelFactory.ts";
import {createGround} from "./Entities/GroundFactory.ts";

export class TestApp extends App {
    constructor() {
        super();
    }

    override start() {
        super.start();

        createFpsEntity(this.ecsManager, {x: 0, y: 0})

        createGameStartPanel(this.ecsManager, this.screen);

        createBird(
            this.ecsManager,
            this.screen,
            {
                x: 10,
                y: 5
            }
        );

        createGround(this.ecsManager, "*".repeat(this.screen.width), {
            x: 0,
            y: this.screen.height
        })

        createGround(this.ecsManager, "*".repeat(this.screen.width), {
            x: 0,
            y: -1,
        })

    }
}
