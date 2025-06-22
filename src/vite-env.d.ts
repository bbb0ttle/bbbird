/// <reference types="vite/client" />
declare module '*.bba' {
    import type {FramesAnimation} from "./BaseApp/Core/types.ts";

    const content: FramesAnimation;

    export default content;
}
