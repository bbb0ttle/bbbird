import {autoRegisterCom} from "../ECS/decoractors.ts";

export interface Screen {
  width: number;
  height: number;

  pixels: Pixel[][];
}

export class Size {
    width: number = 0;
    height: number = 0;
}

@autoRegisterCom
export class Position {
  x: number = 0;
  y: number = 0;
}

export interface Pixel {
  Shape: string;
  Pos: Position;
}

export type Picture = string[][];

export type BinaryNum = 0 | 1;

export type Glyph = BinaryNum[][];

export type Glyphs = {
  [key: string]: Glyph
}

export interface FramesAnimation {
  [key: string]: Picture[]
}

export interface Font {
  Name: string;
  Glyphs: {
    [key: string]: Glyph
  };

  GetChar: (targetChar: string, shape: string) => Picture;

  CharWidth: number;
  CharHeight: number;
  CharSpace: number;
}
