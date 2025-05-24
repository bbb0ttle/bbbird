import type {Font, Glyphs, Picture} from "../../tyes.ts";
import bbGlyphs from "./bbf.json";

export const BBF: Font = {
    CharHeight: 3,
    CharWidth: 5,
    CharSpace: 2,
    Name: "BBF",
    Glyphs: bbGlyphs as Glyphs,

    GetChar(targetChar: string, shape: string): Picture {
        if (!this.Glyphs[targetChar]) {
            return [];
        }

        const glyph = this.Glyphs[targetChar];
        const picture: Picture = [];
        for (let i = 0; i < glyph.length; i++) {
            const row: string[] = [];
            for (let j = 0; j < glyph[i].length; j++) {
                row.push(glyph[i][j] ? shape : ' ');
            }
            picture.push(row);
        }
        return picture;
    },
}