#!/usr/bin/env ts-node
import { lstatSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

const FILE_EXT: string = "";

export default class Utils {

    private isFile = source => lstatSync(source).isFile();
    private isDirectory = source => lstatSync(source).isDirectory();
    private getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(this.isDirectory);

    private cwd: string;
    private children: string[];
    constructor() {
        this.cwd = process.cwd();
        this.children = this.getDirectories(this.cwd);
    }

    checkIfFile(...paths: string[]): boolean {
        if (paths.length >= 1) {
            for (let i: number = 0; i < paths.length; ++i) {
                try {
                    if (this.isFile(paths[i])) {
                        if (i == paths.length - 1) {
                            return true;
                        }
                    } else {
                        console.log(paths[i] + " is not a file.");
                        return false;
                    }
                } catch (e) {
                    console.log(paths[i] + " is not a file.");
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    checkIfDirectory(...paths: string[]): boolean {
        if (paths.length >= 1) {
            for (let i: number = 0; i < paths.length; ++i) {
                try {
                    if (this.isDirectory(paths[i])) {
                        if (i == paths.length - 1) {
                            return true;
                        }
                    } else {
                        console.log(paths[i] + " is not a directory.");
                        return false;
                    }
                } catch (e) {
                    console.log(paths[i] + " is not a directory.");
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }

    checkIfFileExtension(FILE_EXT: string, ...paths: string[]): boolean {
        if (paths.length >= 1) {
            paths.forEach(path => {
                if (!path.includes(FILE_EXT, -4)) {
                    console.log(path + " is not a " + FILE_EXT + " file.");
                    return false;
                }
            });
            return true;
        } else {
            return false;
        }
    }

    // getFiles(path: string = "./"): string[] {
    //     return [""];
    // }

}