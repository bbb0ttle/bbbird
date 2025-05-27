import type {ECSManager, EntityId} from "../../BaseApp/ECS/ecs.ts";

export class SpawnComponent {
    public static name = "SpawnComponent";

    public static register(ecs: ECSManager) {
        ecs.registerComponentType<typeof this>(SpawnComponent.name)
    }

    public onSpawn: () => EntityId = () => -1;

    public getNextSpawnTime: () => number = () => 0;
}