import {autoRegisterCom} from "../../BaseApp/ECS/decoractors.ts";

export enum ScoreEntityType {
    Bird,
    Wall,
}

@autoRegisterCom
export class ScoreUpdateComponent {
    public Type: ScoreEntityType = ScoreEntityType.Wall
    public Score: number = 0
}