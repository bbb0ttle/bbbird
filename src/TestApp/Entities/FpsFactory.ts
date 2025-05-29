import {ECSManager, type EntityId} from "../../BaseApp/ECS/ecs.ts";
import {Position} from "../../BaseApp/Core/types.ts";
import {type FpsCom, FpsCompName} from "../Components/FpsComponent.ts";
import {TextCom} from "../../BaseApp/Components";

export const createFpsEntity = (ecs: ECSManager, pos: Position): EntityId => {
    const fpsEntity = ecs.createEntity();

    ecs.addComponent<TextCom>(fpsEntity, TextCom.name, { text: '', isPlain: true })
    ecs.addComponent<Position>(fpsEntity, Position.name, pos);
    ecs.addComponent<FpsCom>(fpsEntity, FpsCompName, {
        value: fpsEntity,
    })
    return fpsEntity;
}