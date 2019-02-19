/*
 * This runs typescript and tslint on test and src folder
 * Throws error if anything is found
 */

const { TypeChecker } = require('fuse-box-typechecker');


// configure typechecker
const typeChecker = TypeChecker({
    tsConfig: './tsconfig.json',
    basePath: './',
    tsLint: './tslint.json',
    name: 'typecheck and lint src and test folders',
    shortenFilenames: true,
    yellowOnLint: true,
    throwOnGlobal: true,
    throwOnSemantic: true,
    throwOnTsLint: true,
    throwOnSyntactic: true,
    throwOnOptions: true,
    tsConfigOverride: {
        compilerOptions: {
            'rootDir': undefined,
            'outDir': undefined
        },
        exclude: [
            'node_modules',
            'dist',
            'distTS',
            'script'
        ]
    }
});

// start checking
typeChecker.runSync();
