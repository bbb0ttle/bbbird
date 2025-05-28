import type {Picture} from "../Core/types.ts";

export const trimMultilineStr = (str: string): string => {
    return str
        .split('\n')
        // .map(line => line.trimEnd())
        // .filter(line => line.length > 0)
        .join('\n');
}

const getMaxLenStrInMultilineStr = (str: string): number => {
    return str
        .split('\n')
        .reduce((maxLen, line) => Math.max(maxLen, line.length), 0);
}

export const multilineStrToPicture = (str: string): Picture => {
    const trimmedStr = trimMultilineStr(str);
    const maxLen = getMaxLenStrInMultilineStr(trimmedStr);
    const picture: Picture = [];

    trimmedStr.split('\n').forEach(line => {
        const paddedLine = line.padEnd(maxLen, ' ');
        picture.push(paddedLine.split(''));
    });

    return picture;

}

