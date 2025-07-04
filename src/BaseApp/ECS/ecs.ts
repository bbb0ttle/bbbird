import type {PreScreen} from "../Core/Screen/preScreen.ts";

export type EntityId = number;

export class EntityManager {
    private nextEntityId: EntityId = 1;

    public createEntity() {
        return this.nextEntityId ++
    }
}

export abstract class System {
    public entities: Set<EntityId> = new Set();

    public abstract update(deltaTime: number): void;

    protected ecs: ECSManager;

    protected screen: PreScreen;

    protected constructor(ecs: ECSManager, screen: PreScreen) {
        this.ecs = ecs;
        this.screen = screen;
    }

    protected getComponent<T>(entity: number, compType: string): T {
        return this.ecs.getComponent<T>(entity, compType) as T;
    }
}

export class ECSManager {
    private entityManager: EntityManager = new EntityManager();
    private components = new Map<string, Map<EntityId, any>>();
    private systems: System[] = [];

    private entityComponentMasks = new Map<EntityId, Set<string>>();
    private systemRequiredComDict = new Map<System, string[]>();

    constructor() {

    }

    public createEntity(): EntityId {
        const entity = this.entityManager.createEntity();
        this.entityComponentMasks.set(entity, new Set<string>());
        return entity;
    }

    public registerComponentType<T>(componentType: string): void {
        if (this.components.has(componentType)) {
            console.warn(`Component type ${componentType} is already registered.`);
            return;
        }
        this.components.set(componentType, new Map<EntityId, T>());
    }

    public isEntityDestroyed(e: EntityId) {
        return !this.entityComponentMasks.has(e);
    }

    public addComponent<T>(entity: EntityId, componentType: string, componentData: T) {
        if (!this.components.has(componentType)) {
            this.registerComponentType<T>(componentType);
        }

        this.components.get(componentType)!.set(entity, componentData);
        this.entityComponentMasks.get(entity)!.add(componentType);
        this.updateSystemEntityLists(entity);
    }

    public getComponent<T>(entity: EntityId, componentType: string): T | undefined {
        return this.components.get(componentType)?.get(entity) as T;
    }

    public removeComponent(entity: EntityId, componentType: string): void {
        this.components.get(componentType)?.delete(entity);
        this.entityComponentMasks.get(entity)?.delete(componentType);
        this.updateSystemEntityLists(entity);
    }

    public removeComponentsByType(componentType: string) {
        if (!this.components.has(componentType)) {
            console.warn(`Component type ${componentType} does not exist.`);
            return;
        }

        const componentMap = this.components.get(componentType)!;
        for (const entity of componentMap.keys()) {
            componentMap.delete(entity);
            this.entityComponentMasks.get(entity)?.delete(componentType);
            this.updateSystemEntityLists(entity);
        }

    }

    public destroyEntity(entity: EntityId): void {
        for (const componentMap of this.components.values()) {
            componentMap.delete(entity);
        }
        this.entityComponentMasks.delete(entity);
        this.updateSystemEntityLists(entity); // 确保从所有系统中移除
    }

    public addSystem(system: System, requiredComponents: string[]): void {
        this.systems.push(system);
        this.systemRequiredComDict.set(system, requiredComponents);
        // 为系统设置其关心的实体列表
        for (const [entityId, componentMask] of this.entityComponentMasks.entries()) {
            if (requiredComponents.every(compType => componentMask.has(compType))) {
                system.entities.add(entityId);
            }
        }
    }

    public destroyAllEntities(): void {
        for (const entity of this.entityComponentMasks.keys()) {
            this.destroyEntity(entity);
        }
        this.entityComponentMasks.clear();
        this.components.clear();
        this.systems.forEach(system => system.entities.clear());
    }

    private getRequiredComponents(sys: System): string[] {
        return this.systemRequiredComDict.get(sys)!;
    }

    private updateSystemEntityLists(entity: EntityId): void {
        const componentMask = this.entityComponentMasks.get(entity);
        if (!componentMask) return; // 实体可能已被销毁

        for (const system of this.systems) {
            if (this.getRequiredComponents(system).every(requiredComponent => componentMask.has(requiredComponent))) {
                system.entities.add(entity);
            } else {
                system.entities.delete(entity);
            }
        }
    }

    public getComponentMap<T>(componentType: string): Map<EntityId, T> {
        const map = this.components.get(componentType);
        return map as Map<EntityId, T>;
    }

    public getOrAddComponent<T>(entity: EntityId, componentType: string, componentData: T): T {
        const old = this.getComponent<T>(entity, componentType);

        if (old == undefined) {
            this.addComponent<T>(entity, componentType, componentData);
            return componentData;
        }

        return old;
    }

    public update(deltaTime: number): void {
        for (const system of this.systems) {
            system.update(deltaTime);
        }
    }
}