import {ECSManager, System} from "../../../BaseApp/ECS/ecs.ts";
import {type FpsCom, FpsCompName} from "../../Components/FpsComponent.ts";
import type {TextCom} from "../../../BaseApp/Components/Rendering/TextComponent.ts";
import {BuiltInComName} from "../../../BaseApp/Components";

export class FPSSystem extends System {
    update(deltaTime: number): void {
        for (const e of this.entities) {
            const fps = this.ecs.getComponentMap<FpsCom>(FpsCompName).get(e);
            let textCom = this.ecs.getComponentMap<TextCom>(BuiltInComName.TEXT_PLAIN).get(e);

            const fpsValue = (1 / deltaTime).toFixed(2);

            if (fps && textCom) {
                fps.value = 1 / deltaTime;
                textCom.text = `fps: ${fpsValue}`;
            }
        }
    }

    private ecs: ECSManager;

    public constructor(ecs: ECSManager) {
        super();

        this.ecs = ecs;
    }

}
