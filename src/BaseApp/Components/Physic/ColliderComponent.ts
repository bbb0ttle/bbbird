import type {EntityId} from "../../ECS/ecs.ts";
import {autoRegisterCom} from "../../ECS/decoractors.ts";

@autoRegisterCom
export class ColliderComponent {
    onCollision: (other: EntityId) => void = () => {};
    fixed?: boolean = false;
    bounce?: boolean = false;
}