import {createFpsEntity} from "./Entities/FpsFactory.ts";
import {type FpsCom, FpsCompName} from "./Components/FpsComponent.ts";
import {App} from "../BaseApp/Core/App";

// @ts-ignore
import * as BirdSystem from "./Systems/"

import {createGround} from "./Entities/GroundFactory.ts";
import {createBird} from "./Entities/BirdFactory.ts";
import {InputComponent} from "./Components/InputComponent.ts";
import {createWallEntity} from "./Entities/WallFactory.ts";
import {AutoRecycleComponent} from "./Components/AutoRecycleComponent.ts";
import {SpawnComponent} from "./Components/SpawnComponent.ts";

export class TestApp extends App {
    constructor() {
        super();
    }

    public override registerSystem() {
        this.ecsManager.registerComponentType<FpsCom>(FpsCompName);
        SpawnComponent.register(this.ecsManager)
    }

    override start() {
        super.start();

        createFpsEntity(this.ecsManager, {
            x: 0,
            y: 0
        })

        createBird(this.ecsManager, this.screen);

        createGround(this.ecsManager, "''''''''''''''''''",{
            x: 0,
            y: this.screen.height / 2
        })

        /* const walls = this.ecsManager.createEntity();
        this.ecsManager.addComponent<SpawnComponent>(walls, SpawnComponent.name, {
            onSpawn: () => {
                createWallEntity(
                    this.ecsManager,
                    this.screen,
                )

                return 0
            },
            getNextSpawnTime: () => {
                // random 1 to 3 seconds
                return Math.random() * 2 + 1.2
            }
        }); */
    }
}
