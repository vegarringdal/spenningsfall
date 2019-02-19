Object.defineProperty(exports, "__esModule", { value: true });
const fuse_box_1 = require("fuse-box");
const { src } = require('fuse-box/sparky');
const tasks_1 = require("./tasks");
const appbundle = {
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
        fuse_box_1.CSSPlugin(),
        fuse_box_1.HTMLPlugin(),
        fuse_box_1.WebIndexPlugin({
            templateString: require(tasks_1.p('./script/temp-index.html')),
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
const serviceWorkerBundle = {
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
        fuse_box_1.QuantumPlugin({
            containedAPI: true,
            bakeApiIntoBundle: true,
            uglify: false
        })
    ]
};
tasks_1.createBundles([appbundle, serviceWorkerBundle]);
src(tasks_1.p('./script/manifest.json'), { base: './' }).dest(tasks_1.p('dev/')).exec();
src(tasks_1.p('./script/icon192x192.png'), { base: './' }).dest(tasks_1.p('dev/')).exec();
src(tasks_1.p('./script/favicon.ico'), { base: './' }).dest(tasks_1.p('dev/')).exec();
//# sourceMappingURL=watch.js.map