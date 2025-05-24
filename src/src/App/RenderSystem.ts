import {type EntityId, System} from "./ecs.ts";
import type {PreScreen} from "../Screen/preScreen.ts";
import type {Picture, Position} from "../Screen/tyes.ts";

export class RenderSystem extends System {
    getRequiredComponents(): string[] {
        return ["picture"];
    }

    // @ts-ignore
    update(deltaTime: number): void {
        this.screen.Clear();

        for (const entity of this.entities) {
            const pos = this.positions.get(entity)
            const pic = this.pictures.get(entity)

            if (pos && pic) {
                this.screen.DrawPicture(pic, pos);
            }
        }
    }

    screen: PreScreen;
    positions: Map<EntityId, Position>;
    pictures: Map<EntityId, Picture>;

    public constructor(
        screen: PreScreen,
        pictures: Map<EntityId, Picture>,
        positions: Map<EntityId, Position>,
    ) {
        super();

        this.screen = screen;
        this.positions = positions;
        this.pictures = pictures;
    }


}