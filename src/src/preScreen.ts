import type { Pixel, Position, Screen } from './screen';

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
}

export class PreScreen implements Screen {
  pixels: CharPixel[][] = [];
  width: number = 50;
  height: number = 10;

  constructor() {
    this.Init(' ');
  }

  Init(char = 'F') {
    for (var i = 0; i < this.height; i++) {
      this.pixels[i] = [];
      for (var j = 0; j < this.width; j++) {
        this.pixels[i].push(
          new CharPixel(
            {
              x: j,
              y: i,
            },
            char
          )
        );
      }
    }
  }

  Draw() {
    let str = '';

    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        str += this.pixels[i][j].Shape;
      }
      str += '\n';
    }

    this._pre.innerText = str;
  }

  DrawPixel(p: Pixel) {
    this.pixelWalker(target => {
      if (target.IsPosEqual(p)) {
        target.Shape = p.Shape;
      }
    });
  }

  private pixelWalker(pixelUpdater: (p: CharPixel) => void) {
    let str = '';

    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        const p = this.pixels[i][j];
        pixelUpdater(p);
        str += p.Shape;
      }
      str += '\n';
    }

    this._pre.innerText = str;
  }

  private _pre: HTMLPreElement = document.getElementById(
    'the-pre'
  ) as HTMLPreElement;
}
