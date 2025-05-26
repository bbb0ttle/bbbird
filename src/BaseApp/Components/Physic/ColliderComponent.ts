import type {Size} from "../../Core/types.ts";
import type {EntityId} from "../../ECS/ecs.ts";

export interface ColliderComponent {
    size: Size
    onCollision: (other: EntityId) => void;
}