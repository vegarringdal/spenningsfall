import { ITypeCheckerOptions } from '../../node_modules/fuse-box-typechecker/dist/commonjs/interfaces';
export declare function p(stringPath: string): string;
export declare function createBundles(bundles: Ibundle[]): void;
export interface Ibundle {
    homeDir: string;
    output: string;
    bundleName: string;
    outputFolder: string;
    target: string;
    cache: boolean;
    plugins: any[];
    instructions: string;
    production?: boolean;
    devServer?: undefined | {
        port?: number;
        root: string;
    };
    hmr?: any;
    sourcemaps?: boolean;
    watch?: string;
    typechecker?: ITypeCheckerOptions;
    log?: boolean;
}
