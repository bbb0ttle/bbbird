import {Picture, Position, Size} from "../../BaseApp/Core/types.ts";
import {ECSManager, type EntityId} from "../../BaseApp/ECS/ecs.ts";
import type {PreScreen} from "../../BaseApp/Core/Screen/preScreen.ts";
import {VelocityComponent} from "../../BaseApp/Components";
import {AutoRecycleComponent} from "../Components/AutoRecycleComponent.ts";
import {ColliderComponent} from "../../BaseApp/Components/Physic/ColliderComponent.ts";
import {SpawnComponent} from "../Components/SpawnComponent.ts";

const createWallEntity = (
    ecs: ECSManager,
    screen: PreScreen,
    shape: string = "<",
) => {
    const holeHeight = 15;
    const wallWidth = 4;

    const totalVisibleHeight = screen.height - holeHeight;
    if (totalVisibleHeight <= 0) {
        throw new Error("Hole height is too large for the screen height.");
    }

    // random from 1 to totalVisibleHeight;
    const topWallHeight: number = Math.floor(Math.random() * (totalVisibleHeight - 1)) + 1;
    const bottomWallHeight: number = totalVisibleHeight - topWallHeight;

    const createWallByHeight = (h: number) => {
        const eid = ecs.createEntity();
        const brick = Array.from({ length: wallWidth}, () => shape);
        const wall = Array.from({ length: h }, () => brick);

        ecs.addComponent<Picture>(eid, Picture.name, new Picture(wall));

        ecs.addComponent<VelocityComponent>(eid, VelocityComponent.name, {
            vx: -12.5,
            vy: 0
        })

        ecs.addComponent<AutoRecycleComponent>(eid, AutoRecycleComponent.name, {});

        return eid;
    }

    const topWallEntity = createWallByHeight(topWallHeight);
    ecs.addComponent<Position>(topWallEntity, Position.name, {
        x: screen.width - wallWidth,
        y: 0
    });

    ecs.addComponent<Size>(topWallEntity, Size.name, {
        height: topWallHeight,
        width: wallWidth,
    })

    ecs.addComponent<ColliderComponent>(topWallEntity, ColliderComponent.name, {
        onCollision: () => {}
    })

    const bottomWallEntity = createWallByHeight(bottomWallHeight);
    ecs.addComponent<Position>(bottomWallEntity, Position.name, {
        x: screen.width - wallWidth,
        y: topWallHeight + holeHeight
    });

    ecs.addComponent<Size>(bottomWallEntity, Size.name, {
        height: bottomWallHeight,
        width: wallWidth,
    });
    ecs.addComponent<ColliderComponent>(bottomWallEntity, ColliderComponent.name, {
        onCollision: () => {}
    })

    return [topWallEntity, bottomWallEntity];
}

export class WallFactory {
    private static instance: WallFactory;
    private constructor(ecs: ECSManager, screen: PreScreen) {
        this._ecs = ecs;
        this._screen = screen;
        this._wallsEntity = ecs.createEntity();

        this.getSpawnComponent();
    }



    private _ecs: ECSManager;
    private _screen: PreScreen;
    private _wallsEntity: EntityId;
    private _walls: EntityId[] = [];

    private getSpawnComponent(): SpawnComponent | undefined {
        return this._ecs.getOrAddComponent<SpawnComponent>(this._wallsEntity, SpawnComponent.name, {
            onSpawn: () => {
                this._walls.push(...createWallEntity(
                    this._ecs,
                    this._screen,
                ));
            },
            started: false,
            getSpawnInterval: () => {
                return Math.random() * 2 + 1.2
            }
        });
    }

    public destroy(): void {
        this._ecs.removeComponent(this._wallsEntity, SpawnComponent.name)

        this._walls.forEach((wall) => {
            this._ecs.destroyEntity(wall)
        })
    }

    public createWalls() {
        const sCom = this.getSpawnComponent();
        if (sCom) {
            sCom.started = true;
        }
    }

    public pause() {
        const sCom = this.getSpawnComponent();
        if (sCom) {
            sCom.started = false;
        }
    }

    public static GetInst(ecs: ECSManager, screen: PreScreen): WallFactory {
        if (!WallFactory.instance) {
            WallFactory.instance = new WallFactory(ecs, screen);
        }
        return WallFactory.instance;

    }
}