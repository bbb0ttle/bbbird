import {createFpsEntity} from "./Entities/FpsFactory.ts";
import {type FpsCom, FpsCompName} from "./Components/FpsComponent.ts";
import {App} from "../BaseApp/Core/App";

// @ts-ignore
import * as BirdSystem from "./Systems/"

// import {createGround} from "./Entities/GroundFactory.ts";
import {createBird} from "./Entities/BirdFactory.ts";
import {type InputComponent, InputCompName} from "./Components/InputComponent.ts";
import {createWallEntity} from "./Entities/WallFactory.ts";
import {AutoRecycleComponent} from "./Components/AutoRecycleComponent.ts";

export class TestApp extends App {
    constructor() {
        super();
    }

    public override registerSystem() {
        this.ecsManager.registerComponentType<FpsCom>(FpsCompName);
        this.ecsManager.registerComponentType<InputComponent>(InputCompName)
        this.ecsManager.registerComponentType<AutoRecycleComponent>(AutoRecycleComponent.name)
    }

    override start() {
        super.start();

        createFpsEntity(this.ecsManager, {
            x: 0,
            y: 0
        })

        createBird(this.ecsManager, this.screen);

        // createGround(this.ecsManager, "'''''''''''''",{
        //     x: 0,
        //     y: this.screen.height - 2
        // })

        createWallEntity(
            this.ecsManager,
            this.screen,
        )
    }
}
