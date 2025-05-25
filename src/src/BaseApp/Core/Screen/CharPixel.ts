import type {Pixel, Position} from "./tyes.ts";

export class CharPixel implements Pixel {
    Shape: string = '';
    Pos: Position = { x: 0, y: 0 };

    constructor(p: Position, s: string) {
        this.Shape = s;
        this.Pos = p;
    }

    IsPosEqual(p: Pixel): boolean {
        return this.Pos.x === p.Pos.x && this.Pos.y === p.Pos.y;
    }

    static Create(x: number, y: number, shape: string): CharPixel   {
        return new CharPixel({
            x, y
        }, shape);
    }
}

