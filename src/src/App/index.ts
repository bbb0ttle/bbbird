import { ECSManager } from "./ecs.ts";
import {PreScreen} from "../Screen/preScreen.ts";
import {RenderSystem} from "./RenderSystem.ts";
import type {Picture, Position} from "../Screen/tyes.ts";

export abstract class App {
    protected ecsManager: ECSManager = new ECSManager();
    private screen: PreScreen = new PreScreen(70, 40);
    private lastFrameTime: number = performance.now(); // 使用 performance.now() 获取高精度时间
    private animationFrameId: number | null = null; // 用于 requestAnimationFrame

    protected constructor() {
        this.ecsManager.registerComponentType<Picture>("picture");
        this.ecsManager.registerComponentType<Position>("position");

        this.ecsManager.addSystem(new RenderSystem(
            this.screen,
            this.ecsManager.getComponentMap<Picture>("picture"),
            this.ecsManager.getComponentMap<Position>("position"),
            ), ["picture", "position"]);
    }

    private gameLoop = () => {
        const currentTime = window.performance.now();
        const deltaTime = (currentTime - this.lastFrameTime) / 1000.0;
        this.lastFrameTime = currentTime;

        this.ecsManager.update(deltaTime);

        this.animationFrameId = window.requestAnimationFrame(this.gameLoop)
    }

    public start() {
        this.animationFrameId = window.requestAnimationFrame(this.gameLoop);
    }

    public stop() {
        if (this.animationFrameId) {
            window.cancelAnimationFrame(this.animationFrameId);
        }
    }
}