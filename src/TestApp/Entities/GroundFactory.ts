import type {ECSManager} from "../../BaseApp/ECS/ecs.ts";
import {Size, Picture, Position} from "../../BaseApp/Core/types.ts";
import {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";

export const createGround = (ecs: ECSManager, shape: string, pos: Position) => {
    const groundEntity = ecs.createEntity();

    ecs.addComponent<Position>(groundEntity, Position.name, pos);

    ecs.addComponent<Picture>(groundEntity, Picture.name, new Picture([shape.split("")]));

    ecs.addComponent<Size>(groundEntity, Size.name, {
        width: shape.length,
        height: 1,
    });

    ecs.addComponent<ColliderComponent>(groundEntity, ColliderComponent.name, {
        onCollision: (_) => {
        }
    });


}