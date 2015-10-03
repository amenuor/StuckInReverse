/// <reference path="./typings/node.d.ts"/>
var utilities = require("./Utils");
var SIRConsole = (function () {
    function SIRConsole() {
    }
    SIRConsole.RunConsoleInterface = function (cmdLineParameters) {
        if (cmdLineParameters.length != 3) {
            console.log("Error invalid parameters. Usage: node SIRConsole.js path/to/program");
            return;
        }
        var adapter = utilities.Utils.getAdapterImplementation(cmdLineParameters[2]);
        console.log("Performing static analysis...");
        adapter.performStaticAnalysis(function (result) {
            console.log(result.stdout);
        });
    };
    return SIRConsole;
})();
SIRConsole.RunConsoleInterface(process.argv);
