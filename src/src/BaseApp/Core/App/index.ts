import { ECSManager } from "../../ECS/ecs.ts";
import {PreScreen} from "../Screen/preScreen.ts";
import type {Picture, Position} from "../Screen/tyes.ts";
import {DotMatrixTextRenderSystem} from "../../Systems/Rendering/DotMatrixTextRenderSystem.ts";
import {PlainRenderSystem} from "../../Systems/Rendering/PlainTextRenderSystem.ts";
import {
    type AnimationComponent,
    BuiltInComName,
    type GravityComponent,
    type TextCom,
    type VelocityComponent
} from "../../Components";
import {MovementSystem} from "../../Systems/Physic/MovementSystem.ts";
import {GravitySystem} from "../../Systems/Physic/GravitySystem.ts";
import {AnimationRenderSystem} from "../../Systems/Rendering/AnimationRenderSystem.ts";

export abstract class App {
    protected ecsManager: ECSManager = new ECSManager();
    private screen: PreScreen = new PreScreen(70, 40);
    private lastFrameTime: number = performance.now(); // 使用 performance.now() 获取高精度时间
    private animationFrameId: number | null = null; // 用于 requestAnimationFrame

    protected constructor() {
        this.ecsManager.registerComponentType<Picture>(BuiltInComName.PIC);
        this.ecsManager.registerComponentType<Position>(BuiltInComName.POS);
        this.ecsManager.registerComponentType<TextCom>(BuiltInComName.TEXT_PLAIN);
        this.ecsManager.registerComponentType<TextCom>(BuiltInComName.TEXT_MAT);
        this.ecsManager.registerComponentType<VelocityComponent>(BuiltInComName.VEL);
        this.ecsManager.registerComponentType<GravityComponent>(BuiltInComName.GRAVITY_ACCELERATION);
        this.ecsManager.registerComponentType<AnimationComponent>(BuiltInComName.ANIMATION);
    }

    private addBuiltInSystem() {
        this.ecsManager.addSystem(new GravitySystem(this.ecsManager), [
            BuiltInComName.VEL,
            BuiltInComName.GRAVITY_ACCELERATION
        ])

        this.ecsManager.addSystem(new MovementSystem(this.ecsManager), [
            BuiltInComName.POS,
            BuiltInComName.VEL
        ]);

        this.ecsManager.addSystem(new DotMatrixTextRenderSystem(
            this.screen,
            this.ecsManager
        ), [
            BuiltInComName.TEXT_MAT,
            BuiltInComName.POS
        ]);

        this.ecsManager.addSystem(new PlainRenderSystem(
            this.screen,
            this.ecsManager
        ), [
            BuiltInComName.TEXT_PLAIN,
            BuiltInComName.POS,
        ]);

        this.ecsManager.addSystem(new AnimationRenderSystem(
            this.ecsManager,
            this.screen
        ), [
            BuiltInComName.ANIMATION,
            BuiltInComName.POS
        ])
    }

    public abstract registerSystem(): void;

    private gameLoop = () => {
        const currentTime = window.performance.now();
        const deltaTime = (currentTime - this.lastFrameTime) / 1000.0;
        this.lastFrameTime = currentTime;

        this.ecsManager.update(deltaTime);

        this.animationFrameId = window.requestAnimationFrame(this.gameLoop)
    }

    public start() {
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