Object.defineProperty(exports, "__esModule", { value: true });
const sparky_1 = require("../../node_modules/fuse-box/sparky");
const fuse_box_1 = require("fuse-box");
const fuse_box_typechecker_1 = require("fuse-box-typechecker");
const fs = require("fs");
const path = require("path");
require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
function p(stringPath) {
    if (stringPath) {
        return path.resolve(process.cwd(), stringPath);
    }
    else {
        return '';
    }
}
exports.p = p;
function createBundles(bundles) {
    const bundle = function (config) {
        const fuse = fuse_box_1.FuseBox.init({
            homeDir: p(config.homeDir),
            output: p(config.output),
            target: config.target,
            plugins: config.plugins,
            cache: config.cache
        });
        let typechecker;
        if (config.typechecker) {
            typechecker = fuse_box_typechecker_1.TypeChecker(config.typechecker);
            if (config.production) {
                typechecker.runSync();
            }
            else {
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
                .instructions(config.instructions)
                .completed((_proc) => {
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
        }
        else {
            fuse.bundle(config.bundleName)
                .instructions(config.instructions)
                .log(config.log ? config.log : false);
        }
        fuse.run();
    };
    bundles.forEach((config) => {
        sparky_1.src(p(config.outputFolder)).clean(p(config.outputFolder));
        bundle(config);
    });
}
exports.createBundles = createBundles;
//# sourceMappingURL=tasks.js.map