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

  DrawString(str: string, pos: Position, font: Font = BBF, shape: string = '*') {
    let x = pos.x;
    const y = pos.y;

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      this.DrawChar(char, { x, y }, font, shape);
      x += font.CharWidth + font.CharSpace;
    }
  }

  DrawCenterString(string: string, font = BBF, shape = '*') {
    const pos = this.getCenterPosForString(string, font);
    this.DrawString(string, pos, font, shape);
  }

  private getCenterPosForString(s: string, font = BBF): Position {
    const stringWid = s.length * (font.CharWidth + font.CharSpace) - font.CharSpace;
    const x = Math.floor((this.width - stringWid) / 2);
    const y = Math.floor((this.height - font.CharHeight) / 2) - 1;

    return { x, y };
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
