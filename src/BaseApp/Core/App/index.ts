import { ECSManager } from "../../ECS/ecs.ts";
import {PreScreen} from "../Screen/preScreen.ts";
import type {Picture, Position, Size} from "../types.ts";
import {
    type AnimationComponent,
    BuiltInComName,
    type GravityComponent,
    type TextCom,
    VelocityComponent
} from "../../Components";
import type {ColliderComponent} from "../../Components/Physic/ColliderComponent.ts";

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

    protected constructor() {
        this.ecsManager.registerComponentType<Picture>(BuiltInComName.PIC);
        this.ecsManager.registerComponentType<Position>(BuiltInComName.POS);
        this.ecsManager.registerComponentType<TextCom>(BuiltInComName.TEXT_PLAIN);
        this.ecsManager.registerComponentType<TextCom>(BuiltInComName.TEXT_MAT);
        this.ecsManager.registerComponentType<GravityComponent>(BuiltInComName.GRAVITY_ACCELERATION);
        this.ecsManager.registerComponentType<AnimationComponent>(BuiltInComName.ANIMATION);
        this.ecsManager.registerComponentType<ColliderComponent>(BuiltInComName.COLLISION);
        this.ecsManager.registerComponentType<Size>(BuiltInComName.SIZE);
    }

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

    public abstract registerSystem(): void;

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
        this.registerSystem();
        this.addBuiltInSystem();
        this.animationFrameId = window.requestAnimationFrame(this.gameLoop);
    }

    public stop() {
        if (this.animationFrameId) {
            window.cancelAnimationFrame(this.animationFrameId);
        }
    }
}