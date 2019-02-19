import { WebIndexPlugin, HTMLPlugin, CSSPlugin, QuantumPlugin, Sparky } from 'fuse-box';
import { createBundles, p, Ibundle } from './tasks';



const appbundle: Ibundle = {
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
        CSSPlugin(),
        HTMLPlugin(),
        WebIndexPlugin({
            templateString: require(p('./script/temp-index.html')),
            path: './'
        }),
        QuantumPlugin({
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


const serviceWorkerBundle: Ibundle = {
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
        QuantumPlugin({
            containedAPI: true,
            bakeApiIntoBundle: true,
            uglify: false
        })
    ]
};



createBundles([appbundle, serviceWorkerBundle]);
Sparky.src(p('./script/manifest.json'), { base: './' }).dest(p('dist/')).exec();
Sparky.src(p('./script/icon192x192.png'), { base: './' }).dest(p('dist/')).exec();
Sparky.src(p('./script/favicon.ico'), { base: './' }).dest(p('dist/')).exec();
