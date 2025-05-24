import {App} from "./src/App";
import type {Picture, Position} from "./src/Screen/tyes.ts";
import {BBF} from "./src/FontLib/bbf/bbf.ts";

class TestApp extends App {
    constructor() {
        super();

        this.ShowText();
    }

    private ShowText() {
        var text = this.ecsManager.createEntity();

        this.ecsManager.addComponent<Picture>(text, "picture", BBF.GetChar("H", "="))
        this.ecsManager.addComponent<Position>(text, "position", {x: 0, y: 0});
    }
}

const a = new TestApp();
a.start();