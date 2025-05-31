import {autoRegisterCom} from "../../BaseApp/ECS/decoractors.ts";

@autoRegisterCom
export class SpawnComponent {
    public onSpawn: () => void = () => {};

    public getSpawnInterval: () => number = () => 0;

    public started: boolean = false;
}