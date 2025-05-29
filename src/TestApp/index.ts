import {createFpsEntity} from "./Entities/FpsFactory.ts";
import {App} from "../BaseApp/Core/App";

// @ts-ignore
import * as BirdSystem from "./Systems/"

// import {createGround} from "./Entities/GroundFactory.ts";
import {createBird} from "./Entities/BirdFactory.ts";
import {SpawnComponent} from "./Components/SpawnComponent.ts";
import {createWallEntity} from "./Entities/WallFactory.ts";

export class TestApp extends App {
    constructor() {
        super();
    }

    override start() {
        super.start();

        createFpsEntity(this.ecsManager, {
            x: 0,
            y: 0
        })

        createBird(this.ecsManager, this.screen);

        // createGround(this.ecsManager, "''''''''''''''''''",{
        //     x: 0,
        //     y: this.screen.height / 2
        // })

        const walls = this.ecsManager.createEntity();
        this.ecsManager.addComponent<SpawnComponent>(walls, SpawnComponent.name, {
            onSpawn: () => {
                createWallEntity(
                    this.ecsManager,
                    this.screen,
                )
            },
            getSpawnInterval: () => {
                // random 1 to 3 seconds
                return Math.random() * 2 + 1.2
            }
        });
    }
}
