export class InputManager {
    public isKeyPressed(key: string): boolean {
        return this._keyPressed.has(key);
    }

    private _keyPressed: Set<string> = new Set();

    private handleKeyDown = (event: KeyboardEvent) => {
        console.log("Key pressed:", event.key);
        this._keyPressed.add(event.key);
    }

    private handleKeyUp = (event: KeyboardEvent) => {
        console.log("Key up:", event.key);
        this._keyPressed.delete(event.key);
    }

    private constructor() {
        document.addEventListener('keydown', this.handleKeyDown);

        document.addEventListener('keyup', this.handleKeyUp);
    }

    private static instance: InputManager | null = null;

    public static getInst(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager();
        }
        return InputManager.instance;
    }
}