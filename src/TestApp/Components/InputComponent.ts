import { autoRegisterCom } from "../../BaseApp/ECS/decoractors";

@autoRegisterCom
export class InputComponent {
    onJump: () => void = () => {};
    onFalling: () => void = () => {};
    jumpStep: number = 30;
}
