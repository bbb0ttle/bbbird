import {autoRegisterCom} from "../../ECS/decoractors.ts";

@autoRegisterCom
export class GravityComponent {
    scale: number = 1
}
