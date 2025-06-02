import {autoRegisterCom} from "../../BaseApp/ECS/decoractors.ts";

@autoRegisterCom
export class PressRecycleComponent {
    pressedKey: Set<string> = new Set();
}