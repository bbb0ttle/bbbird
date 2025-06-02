import {createFpsEntity} from "./Entities/FpsFactory.ts";
import {App} from "../BaseApp/Core/App";

// @ts-ignore
import * as BirdSystem from "./Systems/"
import {createBird} from "./Entities/BirdFactory.ts";
import {createPanel} from "./Entities/PanelFactory.ts";
import {createGround} from "./Entities/GroundFactory.ts";
import {PressRecycleComponent} from "./Components/PressRecycleComponent.ts";

export class TestApp extends App {
    constructor() {
        super();
    }

    override start() {
        super.start();

        createFpsEntity(this.ecsManager, {x: 0, y: 0})

        const startScreen = createPanel(
            this.ecsManager,
            this.screen,
            "press 'space' to start\npress 'space' to jump\n\nthat's all.",
            {
                width: 50,
                height: 8,
            },
            true,
        )

        this.ecsManager.addComponent<PressRecycleComponent>(startScreen, PressRecycleComponent.name, {
            pressedKey: new Set(" ")
        })


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
