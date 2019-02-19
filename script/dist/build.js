Object.defineProperty(exports, "__esModule", { value: true });
const fuse_box_1 = require("fuse-box");
const tasks_1 = require("./tasks");
const appbundle = {
    homeDir: './src',
    output: './dist/$name.js',
    bundleName: 'app',
    outputFolder: './dist',
    target: 'browser@es6',
    instructions: `
            > index.ts
            + **/*.{ts,html,css}
            - worker.ts`,
    watch: './src/**.*',
    production: true,
    cache: false,
    log: true,
    plugins: [
        fuse_box_1.CSSPlugin(),
        fuse_box_1.HTMLPlugin(),
        fuse_box_1.WebIndexPlugin({
            templateString: require(tasks_1.p('./script/temp-index.html')),
            path: './'
        }),
        fuse_box_1.QuantumPlugin({
            target: 'browser',
            css: { clean: true },
            uglify: true,
            treeshake: true,
            polyfills: ['Promise'],
            bakeApiIntoBundle: this.bundleName
        })
    ],
    typechecker: {
        tsConfig: './tsconfig.json',
        name: 'production',
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
    output: './dist/$name.js',
    bundleName: 'serviceWorker',
    outputFolder: './dist',
    target: 'browser@es6',
    production: true,
    cache: false,
    instructions: `,
            > worker.ts`,
    plugins: [
        fuse_box_1.QuantumPlugin({
            containedAPI: true,
            bakeApiIntoBundle: true,
            uglify: false
        })
    ]
};
tasks_1.createBundles([appbundle, serviceWorkerBundle]);
fuse_box_1.Sparky.src(tasks_1.p('./script/manifest.json'), { base: './' }).dest(tasks_1.p('dist/')).exec();
fuse_box_1.Sparky.src(tasks_1.p('./script/icon192x192.png'), { base: './' }).dest(tasks_1.p('dist/')).exec();
fuse_box_1.Sparky.src(tasks_1.p('./script/favicon.ico'), { base: './' }).dest(tasks_1.p('dist/')).exec();
//# sourceMappingURL=build.js.map