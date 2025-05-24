import { PreScreen } from './src/preScreen';

const s = new PreScreen();

s.DrawPixel({
    Pos: {
        x: 0,
        y: 0
    },
    Shape: "*"
});

s.DrawPixel({
    Pos: {
        x: 6,
        y: 6
    },
    Shape: "*"
});

// s.Clear();

s.DrawPicture([
    ['*', '*', '*', '*', '*', '*'],
    ['*', ' ', ' ', ' ', ' ', '*'],
    ['*', ' ', ' ', ' ', ' ', '*'],
    ['*', ' ', ' ', ' ', ' ', '*'],
    ['*', '*', '*', '*', '*', '*']
], {
    x: 5,
    y: 0
});

s.DrawChar("A", {x: 20, y: 0});
s.DrawChar("B", {x: 25, y: 0});
s.DrawChar("C", {x: 30, y: 0});
s.DrawChar("D", {x: 35, y: 0});
