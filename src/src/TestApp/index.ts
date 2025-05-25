import {App, BuiltInComName} from "../BaseApp/Core/App";
import {createFpsEntity} from "./Entities/FpsFactory.ts";
import {type FpsCom, FpsCompName} from "./Components/FpsComponent.ts";
import {FPSSystem} from "./Systems/UI/FpsSystem.ts";

export class TestApp extends App {
    constructor() {
        super();
    }

    public override registerSystem() {
        this.ecsManager.registerComponentType<FpsCom>(FpsCompName);
        this.ecsManager.addSystem(new FPSSystem(this.ecsManager),[
            BuiltInComName.POS,
            BuiltInComName.TEXT_PLAIN,
            FpsCompName
        ]);
    }

    override start() {
        super.start();

        createFpsEntity(this.ecsManager, {
            x: 0,
            y: 0
        })
    }
}
