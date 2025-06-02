import {createFpsEntity} from "./Entities/FpsFactory.ts";
import {App} from "../BaseApp/Core/App";

// @ts-ignore
import * as BirdSystem from "./Systems/"
import {createBird} from "./Entities/BirdFactory.ts";
import {createPanel} from "./Entities/PanelFactory.ts";
import {createGround} from "./Entities/GroundFactory.ts";

export class TestApp extends App {
    constructor() {
        super();
    }

    override start() {
        super.start();

        createFpsEntity(this.ecsManager, {x: 0, y: 0})

        const panel = createPanel(
            this.ecsManager,
            this.screen,
            "press 'space' to start\npress 'space' to jump\n\nthat's all.",
            {
                width: 50,
                height: 8,
            },
            true,

        )

        createBird(
            this.ecsManager,
            this.screen,
            {
                x: 10,
                y: 5
            },
            panel
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
