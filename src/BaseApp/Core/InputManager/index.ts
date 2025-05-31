export class InputManager {
    set onKeyUp(value: (k: string) => void) {
        this._onKeyUp = value;
    }
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
        this._onKeyUp(event.key);
    }

    private _onKeyUp: (k: string) => void;

    public constructor(onKeyUp: (k: string) => void = () => {}) {
        document.addEventListener('keydown', this.handleKeyDown);

        document.addEventListener('keyup', this.handleKeyUp);

        this._onKeyUp = onKeyUp;
    }
}