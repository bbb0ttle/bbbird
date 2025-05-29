import { autoRegisterCom } from "../../ECS/decoractors";

@autoRegisterCom
export class VelocityComponent {
    vx: number = 0;
    vy: number = 0;
}