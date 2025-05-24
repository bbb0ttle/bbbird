import { PreScreen } from './src/preScreen';

const s = new PreScreen();

s.Draw();

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
