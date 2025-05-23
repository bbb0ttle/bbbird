export interface Screen {
  width: number;
  height: number;

  pixels: Pixel[][];
}

export type Position = {
  x: number;
  y: number;
};

export interface Pixel {
  Shape: string;
  Pos: Position;
}
