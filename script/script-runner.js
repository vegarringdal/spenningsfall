const TypeChecker = require('fuse-box-typechecker').TypeChecker
const childProcess = require('child_process');
const path = require('path');
const fileToRun = process.argv.slice(2)[0];


// configure typechecker
const typeChecker = TypeChecker({
    tsConfig: './tsconfig-script.json',
    basePath: './script/',
    tsLint: './tslint-script.json',
    name: 'script-runner',
    shortenFilenames: true,
    yellowOnLint: true,
    emit: true,
    clearOnEmit: true,
    tsConfigOverride: {
        "compilerOptions": {
            "rootDir": "./src",
            "outDir": "./dist",
            "target": "es6",
            "paths": {},
        }
    },

});

// start build, will only emit when there is no errors
const errors = typeChecker.runSync();

if (!errors && fileToRun) {
    const runner = async function () {
        const runScript = (scriptPath) => {
            return new Promise((resolve, reject) => {
                // child process
                const process = childProcess.fork(scriptPath);
                let invoked;
                // listen for errors as they may prevent the exit event from firing
                process.on('error', function (err) {
                    if (invoked) return;
                    invoked = true;
                    reject(err);
                });

                // execute the callback once the process has finished running
                process.on('exit', function (code) {
                    if (invoked) return;
                    invoked = true;
                    const err = code === 0 ? null : new Error('exit code ' + code);
                    resolve(err);
                });
            })
        }

        const file = path.resolve('./script/dist/', fileToRun);
        try {
            await runScript(file);
            console.log(`finished running ${fileToRun}.js`);
        } catch (e) {
            console.error(e);
        }
    }
    runner();


}
