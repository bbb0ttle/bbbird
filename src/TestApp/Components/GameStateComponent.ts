import {autoRegisterCom} from "../../BaseApp/ECS/decoractors.ts";

export enum GameState {
    Init = 0,
    Playing = 1,
    GameOver = 2,
}

@autoRegisterCom
export class GameStateComponent {
    public state: GameState = GameState.Init;
    public score: number = 0; // 游戏的当前或最终得分

    public onEnterPlaying: () => void = () => {}; // 进入游戏状态时的回调

    public onEnterGameOver: () => void = () => {}; // 进入游戏结束状态时的回调
}