import adaptOS = require('./OSAdapters/IAdaptOS');
import unixOS = require('./OSAdapters/UnixAdapter');

export class Utils{

  public static getAdapterImplementation(pathToProgram: string): adaptOS.IAdaptOS{
    switch(process.platform)
    {
      case 'darwin':
        return new unixOS.UnixAdapter(pathToProgram);
        break;
      default:
        throw new Error("Platform " + process.platform + " is not supported yet.");
    }
  }

}
