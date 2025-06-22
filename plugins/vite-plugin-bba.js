import { promises as fs } from 'fs';
import {BBAParser} from "./bba-parser.js";

/**
 * @param {object} [options] - 插件配置.
 * @param {RegExp} [options.fileRegex] - 用于匹配目标文件路径的正则表达式.
 */
export default function plainText(options = {}) {
    // 如果用户没有提供正则表达式，我们默认处理 .txt 文件
    const fileRegex = options.fileRegex || /\.bba$/;

    return {
        name: 'vite-plugin-bba', // 插件名称，必须提供

        // `load` 钩子用于加载自定义文件
        async load(id) {
            // `id` 是被导入文件的绝对路径
            // 我们检查这个路径是否匹配我们想要处理的文件类型
            if (fileRegex.test(id)) {
                try {
                    // 异步读取文件内容
                    const content = await fs.readFile(id, 'utf-8');

                    const parsedContent = BBAParser(content);

                    return {
                        code: `export default ${JSON.stringify(parsedContent)};`,
                        map: null, // 我们没有生成 source map，所以设为 null
                    };

                } catch (e) {
                    // 如果文件读取失败，可以抛出一个错误
                    this.error(`Failed to load file: ${id}`, e);
                }
            }

            // 如果文件不匹配我们的正则表达式，返回 null，让其他插件或 Vite 核心来处理
            return null;
        }
    };
}