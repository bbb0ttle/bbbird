import {autoRegisterCom} from "../../ECS/decoractors.ts";

@autoRegisterCom
export class UICom {
    public Visible: boolean = false;
}