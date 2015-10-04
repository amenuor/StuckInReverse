var exec = require('child_process').exec;
import staticAnalysis = require('../StaticAnalysis');
import adaptOS = require('./IAdaptOS');
import async = require('async');

export class UnixAdapter implements adaptOS.IAdaptOS{
  private _pathToProgram: string;

  constructor(pathToProgram: string)
  {
    this._pathToProgram = pathToProgram;
  }

  public performStaticAnalysis = (callback:Function) => {
    var stringsAnalysisFun = (callback) => {
      this.runShellCommand("strings " + this._pathToProgram, function (error, stdout, stderr) {
        var stringRes = new staticAnalysis.ProgramStringsExtraxtionResults(stdout, stderr, error);
        callback(null, stringRes);
      });
    };

    var fileAnalysisFun = (callback) => {
      this.runShellCommand("file " + this._pathToProgram, function (error, stdout, stderr) {
        var fileRes = new staticAnalysis.FileExtraxtionResults(stdout, stderr, error);
        callback(null, fileRes);
      });
    };

    async.parallel({
      stringAnalysis: stringsAnalysisFun,
      fileAnalysis: fileAnalysisFun
    }, function(err, results){
      if(err)
        throw err; //TODO
      var finalResult = new staticAnalysis.StaticAnalysisResults();
      finalResult.ProgramStringsExtraxtionResults = results["stringAnalysis"] as staticAnalysis.ProgramStringsExtraxtionResults;
      finalResult.FileExtraxtionResults = results["fileAnalysis"] as staticAnalysis.FileExtraxtionResults;
      callback(finalResult);
    });

  }

  private runShellCommand(command: string, callback: Function): void{
    exec(command,   callback);
  }


}
