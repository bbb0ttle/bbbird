import {type Font, type Glyphs, Picture} from "../../../Core/types.ts";
import bbGlyphs from "./bbf.json";

export const BBF: Font = {
    CharHeight: 3,
    CharWidth: 5,
    CharSpace: 1,
    Name: "BBF",
    Glyphs: bbGlyphs as Glyphs,

    GetChar(targetChar: string, shape: string): Picture {
        const picture: Picture = new Picture();
        if (!this.Glyphs[targetChar]) {
            return picture
        }

        const glyph = this.Glyphs[targetChar];
        for (let i = 0; i < glyph.length; i++) {
            const row: string[] = [];
            for (let j = 0; j < glyph[i].length; j++) {
                row.push(glyph[i][j] ? shape : ' ');
            }
            picture.Pattern.push(row);
        }
        return picture;
    },
}