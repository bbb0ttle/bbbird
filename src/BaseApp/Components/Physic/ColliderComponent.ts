import type {EntityId} from "../../ECS/ecs.ts";
import {autoRegisterCom} from "../../ECS/decoractors.ts";

@autoRegisterCom
export class ColliderComponent {
    onCollision: (other: EntityId) => void = () => {};
    collisionCount: number = 0; // 碰撞计数
    fixed: boolean = false;
}