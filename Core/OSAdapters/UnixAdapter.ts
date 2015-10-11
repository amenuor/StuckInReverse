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
        var stringRes = new staticAnalysis.ProgramStringsExtractionResults(stdout, stderr, error, this.pathValidation);
        callback(null, stringRes);
      });
    };

    var fileAnalysisFun = (callback) => {
      this.runShellCommand("file " + this._pathToProgram, function (error, stdout, stderr) {
        var fileRes = new staticAnalysis.FileExtractionResults(stdout, stderr, error);
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
      finalResult.ProgramStringsExtractionResults = results["stringAnalysis"] as staticAnalysis.ProgramStringsExtractionResults;
      finalResult.FileExtractionResults = results["fileAnalysis"] as staticAnalysis.FileExtractionResults;
      callback(finalResult);
    });

  }

  public pathValidation(contPathLinux) : boolean
  {
    for(var k=0;k<contPathLinux.length;k++){
      if(contPathLinux.charAt(k).match(/^[\\]$/) ){
        return false;
      }
    }
    if(contPathLinux.charAt(0) != "/")
    {
      return false;
    }
    if(contPathLinux.charAt(0) == "/" && contPathLinux.charAt(1) == "/")
    {
      return false;
    }
    return true;
  }

  private runShellCommand(command: string, callback: Function): void{
    exec(command,   callback);
  }


}
