/// <reference path="./typings/node.d.ts"/>

import adaptOS = require('./OSAdapters/IAdaptOS');
import staticAnalysis = require('./StaticAnalysis');
import utilities = require("./Utils");

class SIRConsole{
    public static RunConsoleInterface(cmdLineParameters: string[]): void{
      if(cmdLineParameters.length != 3){
        console.log("Error invalid parameters. Usage: node SIRConsole.js path/to/program");
        return;
      }

      var adapter: adaptOS.IAdaptOS = utilities.Utils.getAdapterImplementation(cmdLineParameters[2]);

      console.log("Performing static analysis...");
      adapter.performStaticAnalysis(function(result: staticAnalysis.StaticAnalysisResults){
        console.log(result.stdout);
      });

    }
}

SIRConsole.RunConsoleInterface(process.argv);
