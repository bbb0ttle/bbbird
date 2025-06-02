import {autoRegisterCom} from "../../BaseApp/ECS/decoractors.ts";

@autoRegisterCom
export class DeathComponent {
    public deathAnimation: string = ""; // 死亡动画的名称或标识
    public componentsNeedToRemoveAfterDeath: string[] = []; // 死亡后需要移除的组件列表
}