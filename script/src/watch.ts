import { WebIndexPlugin, HTMLPlugin, CSSPlugin, QuantumPlugin } from 'fuse-box';
const { src } = require('fuse-box/sparky');
import { createBundles, p, Ibundle } from './tasks';



const appbundle: Ibundle = {
    homeDir: './src',
    output: './dev/$name.js',
    bundleName: 'app',
    outputFolder: './dev',
    target: 'browser@es6',
    instructions: `
            > index.ts
            + **/*.{ts,html,css}
            - worker.ts`,
    sourcemaps: true,
    watch: 'src/**',
    hmr: false,
    cache: false,
    production: false,
    devServer: {
        port: 8080,
        root: './dev'
    },
    plugins: [
        CSSPlugin(),
        HTMLPlugin(),
        WebIndexPlugin({
            templateString: require(p('./script/temp-index.html')),
            path: './'
        })
    ],
    typechecker: {
        tsConfig: './tsconfig.json',
        name: 'Dev bundle',
        basePath: './',
        tsLint: './tslint.json',
        yellowOnLint: true,
        shortenFilenames: true,
        tsConfigOverride: {
            'exclude': [
                'node_modules',
                'dist',
                'dev',
                'test',
                'script'
            ]
        }
    }
};


const serviceWorkerBundle: Ibundle = {
    homeDir: './src',
    output: './dev/$name.js',
    bundleName: 'serviceWorker',
    outputFolder: './dev',
    target: 'browser@es6',
    instructions: `
            > worker.ts`,
    sourcemaps: true,
    hmr: false,
    log: true,
    cache: false,
    plugins: [
        QuantumPlugin({
            containedAPI: true,
            bakeApiIntoBundle: true,
            uglify: false
        })
    ]
};


createBundles([appbundle, serviceWorkerBundle]);
src(p('./script/manifest.json'), { base: './' }).dest(p('dev/')).exec();
src(p('./script/icon192x192.png'), { base: './' }).dest(p('dev/')).exec();
src(p('./script/favicon.ico'), { base: './' }).dest(p('dev/')).exec();
