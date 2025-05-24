import type {Font, Picture, Pixel, Position, Tyes} from './tyes.ts';
import { CharPixel } from './CharPixel';
import {BBF} from "./FontLib/bbf/bbf.ts";

export class PreScreen implements Tyes {
  pixels: CharPixel[][] = [];
  width: number = 90;
  height: number = 15;

  constructor() {
    this.Init(' ');
  }

  Init(char = ' ') {
    for (let i = 0; i < this.height; i++) {
      this.pixels[i] = [];
      for (let j = 0; j < this.width; j++) {
        this.pixels[i].push(
          CharPixel.Create(j, i, char)
        );
      }
    }
  }

  Clear() {
    this.pixelWalker(p => p.Shape = ' ');
  }

  DrawPixel(p: Pixel) {
    this.pixelWalker(target => {
      if (target.IsPosEqual(p)) {
        target.Shape = p.Shape;
      }
    });
  }

  DrawPicture(picture: Picture, pos: Position) {
    this.pixelWalker(target => {
      const x = target.Pos.x - pos.x;
      const y = target.Pos.y - pos.y;

      if (x >= 0 && x < picture[0].length && y >= 0 && y < picture.length) {
        target.Shape = picture[y][x];
      }
    });
  }

  DrawChar(char: string, pos: Position, font: Font = BBF, shape: string = '*') {
    const picture = font.GetChar(char, shape);
    this.DrawPicture(picture, pos);
  }

  private pixelWalker(pixelUpdater: (p: CharPixel) => void) {
    let str = '';

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
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
