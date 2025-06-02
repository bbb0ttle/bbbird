import {type EntityId, System} from "../../ECS/ecs.ts";
import {Position, Size} from "../../Core/types.ts";
import {VelocityComponent} from "../../Components";
import {ColliderComponent} from "../../Components/Physic/ColliderComponent.ts";
import {autoRegisterSys} from "../../ECS/decoractors.ts";

interface CollisionInfo {
    pos: Position;
    size: Size;
    collider: ColliderComponent;
    velocity: VelocityComponent;
}

@autoRegisterSys([
    Position.name,
    Size.name,
    ColliderComponent.name,
])
export class CollisionSystem extends System {
    private getColliderComponents() {
        return Array.from(this.entities).filter(e => {
            return this.ecs.getComponentMap<Position>(Position.name).has(e)
                && this.ecs.getComponentMap<ColliderComponent>(ColliderComponent.name).has(e)
        })
    }

    private handleHorizontalCollision(overlapX: number, entity1: EntityId, entity2: EntityId) {
        const c1 = this.getCollisionInfo(entity1);
        const c2 = this.getCollisionInfo(entity2);

        if (c1.pos.x < c2.pos.x) { // entity1 在 entity2 左边
            if (!c1.collider.fixed) {
                c1.pos.x -= overlapX;
            }
            if (!c2.collider.fixed) {
                c2.pos.x += overlapX;
            }
        } else { // entity1 在 entity2 右边
            if (!c1.collider.fixed) {
                c1.pos.x += overlapX;
            }

            if (!c2.collider.fixed) {
                c2.pos.x -= overlapX;
            }
        }

        if (c1.velocity && !c1.collider.fixed) {
            c1.velocity.vx *= -0.5
        }

        if (c2.velocity && !c2.collider.fixed) {
            c2.velocity.vx *= -0.5
        }
    }

    private handleVerticalCollision(overlapY: number, entity1: EntityId, entity2: EntityId) {
        const c1 = this.getCollisionInfo(entity1);
        const c2 = this.getCollisionInfo(entity2);

        if (c1.pos.y < c2.pos.y) { // entity1 在 entity2 上面
            if (!c1.collider.fixed) {
                c1.pos.y -= overlapY;
            }
            if (!c2.collider.fixed) {
                c2.pos.y += overlapY;
            }
        } else { // entity1 在 entity2 下面
            if (!c1.collider.fixed) {
                c1.pos.y += overlapY;
            }
            if (!c2.collider.fixed) {
                c2.pos.y -= overlapY;
            }
        }

        if (c1.velocity && !c1.collider.fixed) {
            c1.velocity.vy *= -0.5;
        }

        if (c2.velocity && !c2.collider.fixed) {
            c2.velocity.vy *= -0.5;
        }
    }

    private getCollisionInfo(entity: EntityId): CollisionInfo {
        const pos = this.getComponent<Position>(entity, Position.name);
        const collider = this.getComponent<ColliderComponent>(entity, ColliderComponent.name);
        const vel = this.getComponent<VelocityComponent>(entity, VelocityComponent.name);
        const size = this.getComponent<Size>(entity, Size.name);

        return {
            pos,
            collider,
            velocity: vel,
            size,
        }
    }

    private isCollide(entity1: EntityId, entity2: EntityId) {
        const c1 = this.getCollisionInfo(entity1);
        const c2 = this.getCollisionInfo(entity2);

        return c1.pos.x < c2.pos.x + c2.size.width &&
            c1.pos.x + c1.size.width > c2.pos.x &&
            c1.pos.y < c2.pos.y + c2.size.height &&
            c1.pos.y + c1.size.height > c2.pos.y
    }

    private getOverlap(entity1: EntityId, entity2: EntityId) {
        const c1 = this.getCollisionInfo(entity1);
        const c2 = this.getCollisionInfo(entity2);

        const overlapX = Math.min(c1.pos.x + c1.size.width, c2.pos.x + c2.size.width) - Math.max(c1.pos.x, c2.pos.x);
        const overlapY = Math.min(c1.pos.y + c1.size.height, c2.pos.y + c2.size.height) - Math.max(c1.pos.y, c2.pos.y);

        return {
            x: overlapX,
            y: overlapY,
        };
    }

    public update(_: number): void {
        // 简单的两两碰撞检测 (效率低，但对于少量实体足够)
        const colliderComponents = this.getColliderComponents();

        for (let i = 0; i < colliderComponents.length; i++) {
            const entity1 = colliderComponents[i];

            const collider1 = this.getComponent<ColliderComponent>(entity1, ColliderComponent.name);

            for (let j = i + 1; j < colliderComponents.length; j++) {
                const entity2 = colliderComponents[j];

                const collider2 = this.getComponent<ColliderComponent>(entity2, ColliderComponent.name);

                // AABB 碰撞检测
                if (this.isCollide(entity1, entity2))
                {
                    const overlap = this.getOverlap(entity1, entity2);

                    if (overlap.x < overlap.y) { // 水平方向重叠较少，优先处理水平碰撞
                        this.handleHorizontalCollision(overlap.x, entity1, entity2)
                    } else { // 垂直方向重叠较少，优先处理垂直碰撞
                        this.handleVerticalCollision(overlap.y, entity1, entity2)
                    }

                    collider1.collisionCount ++
                    collider2.collisionCount ++

                    collider1.onCollision(entity2);
                    collider2.onCollision(entity1);
                }
            }
        }
    }
}
