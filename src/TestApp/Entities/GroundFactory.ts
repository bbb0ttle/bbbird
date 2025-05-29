import type {ECSManager} from "../../BaseApp/ECS/ecs.ts";
import {Size, type Picture, Position} from "../../BaseApp/Core/types.ts";
import {BuiltInComName} from "../../BaseApp/Components";
import type {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";

export const createGround = (ecs: ECSManager, shape: string, pos: Position) => {
    const groundEntity = ecs.createEntity();

    ecs.addComponent<Position>(groundEntity, Position.name, pos);

    ecs.addComponent<Picture>(groundEntity, BuiltInComName.PIC, [shape.split("")]);

    ecs.addComponent<Size>(groundEntity, Size.name, {
        width: shape.length,
        height: 1,
    });

    ecs.addComponent<ColliderComponent>(groundEntity, BuiltInComName.COLLISION, {
        onCollision: (_) => {
        }
    });


}