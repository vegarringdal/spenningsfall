import { src } from '../../node_modules/fuse-box/sparky';
import { FuseBox } from 'fuse-box';
import { TypeChecker } from 'fuse-box-typechecker';
import { ITypeCheckerOptions } from '../../node_modules/fuse-box-typechecker/dist/commonjs/interfaces';
import fs = require('fs');
import path = require('path');



/**
 * so require can import html
 */
require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};



/**
 * Path helper
 * @param stringPath: string
 */
export function p(stringPath: string): string {
    if (stringPath) {
        return path.resolve(process.cwd(), stringPath);
    } else {
        return '';
    }
}



/**
 * Bundle helper
 * @param bundles :Ibundle
 */
export function createBundles(bundles: Ibundle[]) {

    const bundle = function (config: Ibundle) {

        const fuse = FuseBox.init({
            homeDir: p(config.homeDir),
            output: p(config.output),
            target: config.target,
            plugins: config.plugins,
            cache: config.cache
        });

        let typechecker: any;
        if (config.typechecker) {
            typechecker = TypeChecker(config.typechecker);
            if (config.production) {
                typechecker.runSync();
            } else {
                typechecker.startTreadAndWait();
            }
        }

        if (!config.production) {
            if (config.devServer) {
                config.devServer.root = p(config.devServer.root);
                config.devServer.port = config.devServer.port ? config.devServer.port : 8080;
                fuse.dev(config.devServer);
            }

            const bundle = fuse.bundle(config.bundleName)

                .log(config.log ? config.log : false)
                .sourceMaps(config.sourcemaps ? config.sourcemaps : false)
                // .hmr(config.hmr ? config.hmr : false)
                .instructions(config.instructions)
                .completed((_proc: any) => {
                    console.log(`\x1b[36m%s\x1b[0m`, `bundled created/updated:`, _proc.bundle.name);
                    if (config.typechecker) {
                        console.log(`\x1b[36m%s\x1b[0m`, `running type check in background, please wait`);
                        typechecker.useThreadAndTypecheck();
                    }
                });
            if (config.hmr) {
                bundle.hmr(config.hmr);
            }
            if (config.watch) {
                bundle.watch(config.watch);
            }

        } else {
            fuse.bundle(config.bundleName)
                .instructions(config.instructions)
                .log(config.log ? config.log : false);
        }



        fuse.run();
    };

    bundles.forEach((config) => {
        src(p(config.outputFolder)).clean(p(config.outputFolder));
        bundle(config);
    });

}



/**
 * Interface
 */
export interface Ibundle {
    /**
     * "./src"
     */
    homeDir: string;

    /**
     * "./dev/$name.js"
     */
    output: string;

    /**
     * "app"
     */
    bundleName: string;

    /**
     * "./dev"
     */
    outputFolder: string;

    /**
     * "browser@es6" or "browser@es5"
     */
    target: string;


    cache: boolean;


    plugins: any[];

    /**
     * > "index.ts + etc
     */
    instructions: string;

    /**
     * will not devServer if false
     */
    production?: boolean;

    /**
     * { port: 8080, root: './dev'}
     */
    devServer?: undefined | {
        port?: number;
        root: string;
    };

    /**
     * ?
     */
    hmr?: any;

    /**
     * "./src/**""
     */
    sourcemaps?: boolean;

    /**
     * false
     */
    watch?: string;

    /**
     * see fuse-box typechecker for more info
     */
    typechecker?: ITypeCheckerOptions;

    /**
     * false
     */
    log?: boolean;
}
