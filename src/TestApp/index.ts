import {createFpsEntity} from "./Entities/FpsFactory.ts";
import {type FpsCom, FpsCompName} from "./Components/FpsComponent.ts";
import {FPSSystem} from "./Systems/UI/FpsSystem.ts";
import {App} from "../BaseApp/Core/App";
import {BuiltInComName} from "../BaseApp/Components";
import {InputSystem} from "./Systems/Input/InputSystem.ts";
import {createGround} from "./Entities/GroundFactory.ts";
import {createBird} from "./Entities/BirdFactory.ts";

export class TestApp extends App {
    constructor() {
        super();
    }

    public override registerSystem() {
        this.ecsManager.registerComponentType<FpsCom>(FpsCompName);
        this.ecsManager.addSystem(new InputSystem(this.ecsManager), [
            BuiltInComName.VEL
        ])
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

        createBird(this.ecsManager);

        createGround(this.ecsManager, [
            [":", ":", ":", ":", ":", ":", ":", ":", ":", ":"],
        ], {
            x: 0,
            y: 27
        })
    }
}
