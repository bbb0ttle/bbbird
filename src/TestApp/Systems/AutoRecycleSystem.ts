import {System} from "../../BaseApp/ECS/ecs.ts";
import {autoRegisterSys} from "../../BaseApp/ECS/decoractors.ts";
import {BuiltInComName} from "../../BaseApp/Components";
import {Position, type Size} from "../../BaseApp/Core/types.ts";
import {AutoRecycleComponent} from "../Components/AutoRecycleComponent.ts";

@autoRegisterSys([
    Position.name,
    BuiltInComName.SIZE
])
export class AutoRecycleSystem extends System{
    public update(_: number): void {
        for (const e of this.entities) {
            const pos = this.getComponent<Position>(e, Position.name);
            const size = this.getComponent<Size>(e, BuiltInComName.SIZE)
            const autoRecycle = this.getComponent<AutoRecycleSystem>(e, AutoRecycleComponent.name);

            if (pos && size && autoRecycle) {
                // 如果实体的位置超出屏幕范围，则将其位置重置到屏幕中心
                if (pos.x + size.width < 0
                    || pos.x - size.width > this.screen.width
                    || pos.y + size.height < 0
                    || pos.y - size.height > this.screen.height) {
                    this.ecs.destroyEntity(e)
                }
            }
        }
    }

}