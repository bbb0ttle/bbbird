import {autoRegisterCom} from "../../BaseApp/ECS/decoractors.ts";

@autoRegisterCom
export class FpsCom {
    value: number = 0;
}

