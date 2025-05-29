export interface InputComponent {
    onJump: () => void;
    onFalling: () => void;
    jumpStep: number
}

export const InputCompName = "inputComp";