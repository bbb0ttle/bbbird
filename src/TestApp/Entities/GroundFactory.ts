import type {ECSManager} from "../../BaseApp/ECS/ecs.ts";
import type {Picture, Position} from "../../BaseApp/Core/types.ts";
import {BuiltInComName} from "../../BaseApp/Components";
import type {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";

export const createGround = (ecs: ECSManager, shape: Picture, pos: Position) => {
    const groundEntity = ecs.createEntity();

    ecs.addComponent<Position>(groundEntity, BuiltInComName.POS, pos);

    ecs.addComponent<Picture>(groundEntity, BuiltInComName.PIC, shape);

    ecs.addComponent<ColliderComponent>(groundEntity, BuiltInComName.COLLISION, {
        size: {
            width: shape[0].length,
            height: shape.length
        },
        onCollision: (_) => {
        }
    });

}