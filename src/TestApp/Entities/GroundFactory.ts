import type {ECSManager} from "../../BaseApp/ECS/ecs.ts";
import type {Picture, Position} from "../../BaseApp/Core/types.ts";
import {BuiltInComName} from "../../BaseApp/Components";
import type {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";

export const createGround = (ecs: ECSManager, shape: string, pos: Position) => {
    const groundEntity = ecs.createEntity();

    ecs.addComponent<Position>(groundEntity, BuiltInComName.POS, pos);

    ecs.addComponent<Picture>(groundEntity, BuiltInComName.PIC, [shape.split("")]);

    ecs.addComponent<ColliderComponent>(groundEntity, BuiltInComName.COLLISION, {
        size: {
            width: shape.length,
            height: 1,
        },
        onCollision: (_) => {
        }
    });

}