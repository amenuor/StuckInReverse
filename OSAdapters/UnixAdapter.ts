var exec = require('child_process').exec;
import staticAnalysis = require('../StaticAnalysis');
import adaptOS = require('./IAdaptOS');

export class UnixAdapter implements adaptOS.IAdaptOS{
  private _pathToProgram: string;

  constructor(pathToProgram: string)
  {
    this._pathToProgram = pathToProgram;
  }

  public performStaticAnalysis = (callback:Function) => {
    this.runShellCommand(function (error, stdout, stderr) {
      var result = new staticAnalysis.StaticAnalysisResults();
      result.stdout = stdout;
      result.stderr = stderr;
      result.error = error;
      callback(result);
    });
  }

  private runShellCommand(callback: Function): void{
    exec("strings " + this._pathToProgram,   callback);
  }


}
