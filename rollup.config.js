import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import fs from 'fs';
import path from 'path';
import globImport from 'rollup-plugin-glob-import';
import json from '@rollup/plugin-json';

/**
 * Change this to your AE script folder if you would like to autocopy the compiled script to the scripts folder
 * 
 * IMPORTANT: You will need to run as admin to copy to a protected folder (e.g. Program Files)
 * No error will be thrown if the copy fails.
 */
const FILE_PATH = 'C:/Program Files/Adobe/Adobe After Effects 2022/Support Files/Scripts/ScriptUI Panels/LoopUtils.jsx';


const config = {
    input: ['src/looputils.js'],
    external: ["src/**"],
    output: {
        dir: 'dist',
        format: 'iife',
        exports: 'default',
        name: 'exportedLoopUtils',
    },
    plugins: [
        json(),
        globImport(),
        commonjs(),
        nodeResolve({
            include: ["src/**"],
        }),
        getBabelOutputPlugin({
            allowAllFormats: true,
            presets: [
                [
                    "@babel/preset-env",
                    {
                        modules: false,
                    }
                ],
            ],
        }),
        {
            name: 'Finisher',
            async closeBundle() {
                if (!FILE_PATH) {
                    return;
                }
                if (fs.existsSync(path.dirname(FILE_PATH))) {
                    fs.appendFile('dist/looputils.js', 'exportedLoopUtils(this);', () => {
                        fs.copyFile('dist/looputils.js', FILE_PATH, () => undefined);
                        fs.copyFile('dist/looputils.js', 'build/LoopUtils.jsx', () => undefined);
                    });
                } else {
                    console.error('ERROR: Cannot find AE script directory. Ensure that the file path in rollup.config is correct.')
                }
            },
        },
    ],
};

export default config;