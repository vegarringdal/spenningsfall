const { FuseBox, Sparky, WebIndexPlugin, SVGPlugin, CSSPlugin, QuantumPlugin, PostCSSPlugin } = require("fuse-box");
const { src, task, watch, context, fuse } = require("fuse-box/sparky");


context(class {
    getConfig() {
        return FuseBox.init({
            homeDir: "src",
            output: "dist/$name.js",
            basePath: './',
            target: "browser@es6",
            cache: false,
            hash: this.isProduction,
            sourceMaps: this.isProduction ? false : true,
            useTypescriptCompiler: true,
            plugins: [
                [PostCSSPlugin(this.isProduction ? [
                    require('tailwindcss'),
                    require('autoprefixer'),
                    require('@fullhuman/postcss-purgecss')({
                        // Specify the paths to all of the template files in your project 
                        content: [
                            './src/**/*.ts'
                            // etc.
                        ],
                        // Include any special characters you're using in this regular expression
                        defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
                    }) 
                ]: [
                    require('tailwindcss'),
                    require('autoprefixer')
                ]),
                CSSPlugin()],
                SVGPlugin(),
                WebIndexPlugin({
                    template: "src/index.html",
                    path: './'
                    
                }),
                this.isProduction && QuantumPlugin({
                    bakeApiIntoBundle: "app",
                    uglify: true,
                    treeshake: false,
                    css: false //<- keep false since we allready use purge
                })
            ]
        })
    }
    createBundle(fuse) {
        const app = fuse.bundle("app");
        if (!this.isProduction) {
            app.watch()
            // app.hmr()
        }
        app.instructions(">index.ts");
        return app;
    }
});



task("clean", () => src("dist").clean("dist").exec())



task("default", ["clean"], async context => {
    const fuse = context.getConfig();
    fuse.dev();
    context.createBundle(fuse);
    await fuse.run();
});



task("dist", ["clean"], async context => {
    context.isProduction = true;
    const fuse = context.getConfig();
    fuse.dev(); // remove it later
    context.createBundle(fuse);
    await fuse.run();
});