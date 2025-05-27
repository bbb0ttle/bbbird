import type {EntityId} from "../../ECS/ecs.ts";

export interface ColliderComponent {
    onCollision: (other: EntityId) => void;
}