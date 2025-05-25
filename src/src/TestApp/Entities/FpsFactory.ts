import {ECSManager, type EntityId} from "../../BaseApp/ECS/ecs.ts";
import type {Position} from "../../BaseApp/Core/Screen/tyes.ts";
import {type FpsCom, FpsCompName} from "../Components/FpsComponent.ts";
import {BuiltInComName, type GravityComponent, type TextCom, type VelocityComponent} from "../../BaseApp/Components";

export const createFpsEntity = (ecs: ECSManager, pos: Position): EntityId => {
    const fpsEntity = ecs.createEntity();

    ecs.addComponent<TextCom>(fpsEntity, BuiltInComName.TEXT_PLAIN, { text: '' })
    ecs.addComponent<Position>(fpsEntity, BuiltInComName.POS, pos);
    ecs.addComponent<FpsCom>(fpsEntity, FpsCompName, {
        value: fpsEntity,
    })
    ecs.addComponent<VelocityComponent>(fpsEntity, BuiltInComName.VEL, {
        vx: 1,
        vy: 0,
    })
    ecs.addComponent<GravityComponent>(fpsEntity, BuiltInComName.GRAVITY_ACCELERATION, {
        scale: 0.5
    })

    return fpsEntity;
}