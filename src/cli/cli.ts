#!/usr/bin/env ts-node
import Utils from './utils';

export type Command = (util: Utils, key: string, ...args: string[]) => Promise<void>;

export class CLI {

    private key: string;
    private args: string[];
    private util: Utils;

    constructor() {
        this.util = new Utils();
        this.key = process.argv[2];
        this.args = process.argv.splice(3);
        const handler = CLI.commands[this.key];
        if (typeof handler !== 'function') {
            CLI.usage("", "Invalid subcommand, try one of the listed subcommands.");
            process.exit(2);
        }
        CLI.commands[this.key](this.util, this.key, ...this.args);
    }

    static usage(key_arg: string = "", detail: string = "") {
        const commandKeys = Object.keys(CLI.commands);
        if (key_arg == "") {
            console.log(`           CLI
        
            Usage: node <project_name> ${commandKeys.join(' | ')}
        
            ${detail}`);
        } else if (commandKeys.includes(key_arg)) {
            console.log(`           CSS-Sort CLI
            
            '${key_arg}' usage: node css_sort ${key_arg} <arg>
            
            ${detail}`);
        }
    }
    static commands: { [s: string]: Command } = {
        async help(util: Utils, key: string, ...args: string[]) {
            CLI.usage("", "");
        },
        async _subcommand1(util: Utils, key: string, ...args: string[]) {

        },
        async _subcommand2(util: Utils, key: string, ...args: string[]) {

        },
        async _subcommand3(util: Utils, key: string, ...args: string[]) {

        }
    };

    // commands[key](...process.argv.slice(3));


}