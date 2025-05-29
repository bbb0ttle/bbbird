import {System} from "../../ECS/ecs.ts";
import type {Position, Size} from "../../Core/types.ts";
import {BuiltInComName, VelocityComponent} from "../../Components";
import type {ColliderComponent} from "../../Components/Physic/ColliderComponent.ts";
import {autoRegisterSys} from "../../ECS/decoractors.ts";

@autoRegisterSys([
    BuiltInComName.POS,
    BuiltInComName.COLLISION,
    BuiltInComName.SIZE
])
export class CollisionSystem extends System {
    private getColliderComponents() {
        return Array.from(this.entities).filter(e => {
            return this.ecs.getComponentMap<Position>(BuiltInComName.POS).has(e)
                && this.ecs.getComponentMap<ColliderComponent>(BuiltInComName.COLLISION).has(e)
        })
    }

    public update(_: number): void {
        // 简单的两两碰撞检测 (效率低，但对于少量实体足够)
        const colliderComponents = this.getColliderComponents();

        for (let i = 0; i < colliderComponents.length; i++) {
            const entity1 = colliderComponents[i];

            const pos1 = this.getComponent<Position>(entity1, BuiltInComName.POS);
            const collider1 = this.getComponent<ColliderComponent>(entity1, BuiltInComName.COLLISION);
            const vel1 = this.getComponent<VelocityComponent>(entity1, VelocityComponent.name);
            const size1 = this.getComponent<Size>(entity1, BuiltInComName.SIZE);

            for (let j = i + 1; j < colliderComponents.length; j++) {
                const entity2 = colliderComponents[j];

                const pos2 = this.getComponent<Position>(entity2, BuiltInComName.POS);
                const collider2 = this.getComponent<ColliderComponent>(entity2, BuiltInComName.COLLISION);
                const size2 = this.getComponent<Size>(entity2, BuiltInComName.SIZE);

                // AABB 碰撞检测
                if (pos1.x < pos2.x + size2.width &&
                    pos1.x + size1.width > pos2.x &&
                    pos1.y < pos2.y + size2.height &&
                    pos1.y + size1.height > pos2.y)
                {
                    // 发生碰撞！
                    // 这里可以根据需要实现碰撞响应
                    // 例如，阻止移动，或者触发事件

                    // 简单的阻止重叠 (将实体推开)
                    const overlapX = Math.min(pos1.x + size1.width, pos2.x + size2.width) - Math.max(pos1.x, pos2.x);
                    const overlapY = Math.min(pos1.y + size1.height, pos2.y + size2.height) - Math.max(pos1.y, pos2.y);

                    if (overlapX < overlapY) { // 水平方向重叠较少，优先处理水平碰撞
                        if (pos1.x < pos2.x) { // entity1 在 entity2 左边
                            pos1.x -= overlapX;
                        } else { // entity1 在 entity2 右边
                            pos1.x += overlapX;
                        }
                        if (vel1) vel1.vx *= -0.5; // 减速反弹
                    } else { // 垂直方向重叠较少，优先处理垂直碰撞
                        if (pos1.y < pos2.y) { // entity1 在 entity2 上面
                            pos1.y -= overlapY;
                        } else { // entity1 在 entity2 下面
                            pos1.y += overlapY;
                        }
                        if (vel1) vel1.vy *= -0.5; // 减速反弹
                    }

                    collider1.onCollision(entity2);
                    collider2.onCollision(entity1);
                }
            }
        }
    }
}
