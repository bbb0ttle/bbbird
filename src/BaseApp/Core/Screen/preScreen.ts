import {type Font, Picture, type Pixel, type Position, type Screen, Size} from '../types.ts';
import { CharPixel } from './CharPixel.ts';
import {BBF} from "../../Assets/FontLib/bbf/bbf.ts";

export class PreScreen implements Screen {
  pixels: CharPixel[][] = [];
  width: number = 90;
  height: number = 15;

  constructor(width: number = 90, height: number = 90, char: string = ' ') {
    this.width = width;
    this.height = height;
    this.Init(char);
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

  GetCenterPosFor(target: Size): Position {
    const x = Math.floor((this.width - target.width) / 2);
    const y = Math.floor((this.height - target.height) / 2);

    return { x, y };
  }

  DrawPicture(pic: Picture, pos: Position) {
    const picture = pic.Pattern;
    this.pixelWalker(target => {
      const x = Math.floor(target.Pos.x - pos.x);
      const y = Math.floor(target.Pos.y - pos.y);

      if (x >= 0 && x < picture[0]?.length && y >= 0 && y < picture.length) {
        target.Shape = picture[y][x];
      }
    });
  }

  DrawChar(char: string, pos: Position, font: Font = BBF, shape: string = '*') {
    const picture = font.GetChar(char, shape);
    this.DrawPicture(picture, pos);
  }

  DrawText(str: string, pos: Position, font: Font = BBF, shape: string = '*') {
    let x = pos.x;
    const y = pos.y;

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      this.DrawChar(char, { x, y }, font, shape);
      x += font.CharWidth + font.CharSpace;
    }
  }

  DrawPlainText(string: string, pos: Position,) {
    this.pixelWalker(target => {
        const x = Math.ceil(target.Pos.x - pos.x);
        const y = Math.ceil(target.Pos.y - pos.y);

        if (x >= 0 && x < string.length && y === 0) {
            target.Shape = string[x];
        }
    })
  }

  DrawCenterText(string: string, shape = '*', font = BBF) {
    const pos = this.getCenterPosForText(string, font);
    this.DrawText(string, pos, font, shape);
  }

  private getCenterPosForText(s: string, font = BBF): Position {
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
