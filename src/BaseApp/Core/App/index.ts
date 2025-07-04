import { ECSManager } from "../../ECS/ecs.ts";
import {PreScreen} from "../Screen/preScreen.ts";

// @ts-ignore
import * as PhysicSystem from "../../Systems/Physic";

// @ts-ignore
import * as RenderSystem from "../../Systems/Rendering";

import {ComponentRegistry, SystemRegistry} from "../../ECS/decoractors.ts";


export abstract class App {
    protected ecsManager: ECSManager = new ECSManager();
    protected screen: PreScreen = new PreScreen(60, 55);
    private lastFrameTime: number = performance.now(); // 使用 performance.now() 获取高精度时间
    private animationFrameId: number | null = null; // 用于 requestAnimationFrame

    private registerCom() {
        ComponentRegistry.forEach((f: Function) => {
            this.ecsManager.registerComponentType<typeof f>(f.name);
        });
    }

    private addBuiltInSystem() {
        SystemRegistry.forEach((requiredComponents, s) => {
            // @ts-ignore
            const systemInst = new s(this.ecsManager, this.screen);
            this.ecsManager.addSystem(systemInst, requiredComponents);
        })
    }

    private gameLoop = () => {
        const currentTime = window.performance.now();
        const deltaTime = (currentTime - this.lastFrameTime) / 1000.0;
        this.lastFrameTime = currentTime;

        this.screen.Clear();

        this.ecsManager.update(deltaTime);

        this.animationFrameId = window.requestAnimationFrame(this.gameLoop)
    }

    public start() {
        this.registerCom();
        this.addBuiltInSystem();
        this.animationFrameId = window.requestAnimationFrame(this.gameLoop);
    }

    public stop() {
        if (this.animationFrameId) {
            window.cancelAnimationFrame(this.animationFrameId);
        }
    }
}