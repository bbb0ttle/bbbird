import {ECSManager, type EntityId} from "../../BaseApp/ECS/ecs.ts";
import type {Position} from "../../BaseApp/Core/Screen/tyes.ts";
import {type FpsCom, FpsCompName} from "../Components/FpsComponent.ts";
import {BuiltInComName} from "../../BaseApp/Components";
import type {TextCom} from "../../BaseApp/Components/Rendering/TextComponent.ts";

export const createFpsEntity = (ecs: ECSManager, pos: Position): EntityId => {
    const fpsEntity = ecs.createEntity();

    ecs.addComponent<TextCom>(fpsEntity, BuiltInComName.TEXT_PLAIN, { text: '' })
    ecs.addComponent<Position>(fpsEntity, BuiltInComName.POS, pos);
    ecs.addComponent<FpsCom>(fpsEntity, FpsCompName, {
        value: fpsEntity,
    })

    return fpsEntity;
}