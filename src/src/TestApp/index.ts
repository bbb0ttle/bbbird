import {App, BuiltInComName, type TextCom} from "../App";
import type {Position} from "../Screen/tyes.ts";
import {type FpsCom, FpsCompName, FPSSystem} from "./fps";

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

        this.ShowText();
    }

    private ShowText() {
        const fpsEntity = this.ecsManager.createEntity();
        this.ecsManager.addComponent<TextCom>(fpsEntity, BuiltInComName.TEXT_PLAIN, { text: '' })
        this.ecsManager.addComponent<Position>(fpsEntity, BuiltInComName.POS, {
            x: 0,
            y: 0,
        });
        this.ecsManager.addComponent<FpsCom>(fpsEntity, FpsCompName, {
            value: fpsEntity,
        })
    }
}
