import adaptOS = require('../Core/OSAdapters/IAdaptOS');
import staticAnalysis = require('../Core/StaticAnalysis');
import utilities = require("../Core/Utils");

class SIRConsole{
    public static RunConsoleInterface(cmdLineParameters: string[]): void{
      if(cmdLineParameters.length != 3){
        console.log("Error invalid parameters. Usage: node SIRConsole.js path/to/program");
        return;
      }

      var adapter: adaptOS.IAdaptOS = utilities.Utils.getAdapterImplementation(cmdLineParameters[2]);

      console.log("Performing static analysis...");
      adapter.performStaticAnalysis(function(result: staticAnalysis.StaticAnalysisResults){
        console.log(result.ProgramStringsExtractionResults.StdOut);
        console.log(result.FileExtractionResults.stdout);
      });

    }
}

SIRConsole.RunConsoleInterface(process.argv);
