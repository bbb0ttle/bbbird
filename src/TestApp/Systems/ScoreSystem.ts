import {ECSManager, type EntityId, System} from "../../BaseApp/ECS/ecs.ts";
import {autoRegisterSys} from "../../BaseApp/ECS/decoractors.ts";
import {ScoreEntityType, ScoreUpdateComponent} from "../Components/ScoreUpdateComponent.ts";
import {Position} from "../../BaseApp/Core/types.ts";
import type {PreScreen} from "../../BaseApp/Core/Screen/preScreen.ts";

@autoRegisterSys([
    ScoreUpdateComponent.name,
    Position.name
])
export class ScoreSystem extends System {
    constructor(ecs: ECSManager, screen: PreScreen) {
        super(ecs, screen);
    }

    private dirtyEntities: Set<EntityId> = new Set();

    update(_: number): void {
        let birdScoreCom = undefined;
        let birdPosCom = undefined;

        for (const e of this.entities) {
            const scoreCom = this.ecs.getComponent<ScoreUpdateComponent>(e, ScoreUpdateComponent.name)
            const posCom = this.ecs.getComponent<Position>(e, Position.name)
            if (!scoreCom || posCom) {
                continue;
            }

            if (scoreCom.Type === ScoreEntityType.Bird && posCom) {
                birdScoreCom = scoreCom;
                birdPosCom = posCom;
                break;
            }
        }

        for (const e of this.entities) {
            const scoreCom = this.ecs.getComponent<ScoreUpdateComponent>(e, ScoreUpdateComponent.name)
            const posCom = this.ecs.getComponent<Position>(e, Position.name);

            if (!scoreCom || !posCom) {
                continue
            }

            if (this.dirtyEntities.has(e)) {
                continue;
            }

            if (!birdPosCom || !birdScoreCom) {
                continue
            }

            const wallPosX = posCom.x;
            if (wallPosX <  (birdPosCom as Position).x) {
                birdScoreCom.Score ++;
                this.dirtyEntities.add(e)

            }
        }

        this.screen.DrawPlainText(`score: ${birdScoreCom?.Score ?? 0}`, {
            y: 0,
            x: 20
        })

    }
}