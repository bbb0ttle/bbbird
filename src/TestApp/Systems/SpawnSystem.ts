import {autoRegisterSys} from "../../BaseApp/ECS/decoractors.ts";
import {SpawnComponent} from "../Components/SpawnComponent.ts";
import {ECSManager, System} from "../../BaseApp/ECS/ecs.ts";
import type {PreScreen} from "../../BaseApp/Core/Screen/preScreen.ts";

@autoRegisterSys([
    SpawnComponent.name
])
export class SpawnSystem extends System {
    public constructor(ecs: ECSManager, screen: PreScreen) {
        super(ecs, screen);
    }

    private interval: number = 1;

    update(deltaTime: number): void {
        for (const e of this.entities) {
            const spawnCom = this.getComponent<SpawnComponent>(e, SpawnComponent.name);
            if (spawnCom) {
                this.interval -= deltaTime;
                if (this.interval <= 0) {
                    this.interval = spawnCom.getSpawnInterval();
                    spawnCom.onSpawn();
                }
            }
        }
    }
}