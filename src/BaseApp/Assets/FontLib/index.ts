import type {Font} from "../../Core/types.ts";

export class FontLib {
  private _fonts: {
    [key: string]: Font
  } = {}

  constructor() {
  }

  AddFont(font: Font) {
    if (this._fonts === undefined) {
      this._fonts = {};
    }

    if (this._fonts[font.Name] !== undefined) {
      return;
    }

    this._fonts[font.Name] = font;
  }

  GetFont(name: string): Font | undefined {
    return this._fonts[name];
  }
}