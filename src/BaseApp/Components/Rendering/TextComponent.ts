import {autoRegisterCom} from "../../ECS/decoractors.ts";

@autoRegisterCom
export class TextCom {
    isPlain: boolean = true; // 是否纯文本
    text: string = "";
}

