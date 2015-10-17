var exec = require('child_process').exec;
import staticAnalysis = require('../StaticAnalysis');
import adaptOS = require('./IAdaptOS');
import async = require('async');

export class WindowsAdapter implements adaptOS.IAdaptOS{
  private _pathToProgram: string;

  constructor(pathToProgram: string)
  {
    this._pathToProgram = pathToProgram;
  }

  public performStaticAnalysis = (callback:Function) => {
    throw new Error("Windows is not supported yet");
  }

  public pathValidation(contwinpath:string): boolean
  {
    if((contwinpath.charAt(0) != "\\" || contwinpath.charAt(1) != "\\") || (contwinpath.charAt(0) != "/" || contwinpath.charAt(1) != "/"))
    {
      if(!contwinpath.charAt(0).match(/^[a-zA-Z]/))
      {
        return false;
      }
      if(!contwinpath.charAt(1).match(/^[:]/) || !contwinpath.charAt(2).match(/^[\/\\]/))
      {
        return false;
      }

    }
  }
}
