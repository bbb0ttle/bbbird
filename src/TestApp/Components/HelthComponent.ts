import {autoRegisterCom} from "../../BaseApp/ECS/decoractors.ts";

@autoRegisterCom
export class HealthComponent {
    public health: number = 1;
}