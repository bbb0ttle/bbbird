export interface Screen {
  width: number;
  height: number;

  pixels: Pixel[][];
}

export type Size = {
    width: number;
    height: number;
}

export type Position = {
  x: number;
  y: number;
};

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
