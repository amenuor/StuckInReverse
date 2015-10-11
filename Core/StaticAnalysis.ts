import utils = require('./Utils');

export class StaticAnalysisResults
{
  public ProgramStringsExtractionResults: ProgramStringsExtractionResults;
  public FileExtractionResults: FileExtractionResults;
}

export class ProgramStringsExtractionResults
{
  /* Raw data */
  public StdOut: string;
  public StdErr: string;
  public Error: Error;

  /* Processed data */
  public FileNames : string[] = [];
  public Urls : string[] = [];
  public SQLStatements : string[] = [];
  public JSonStrings : string[] = [];
  public XMLElements : string[] = [];

  constructor(stdout:string, stderr:string, error: Error, pathValidation : Function){
    //process data
    if(stdout)
    {
      var lines = stdout.split('\n');
      for(var i = 0;i < lines.length;i++){
        //is it a system path?
        if(pathValidation(lines[i]))
          this.FileNames.push(lines[i]);

        //is it an Url?
        if(utils.Utils.isValidUrl(lines[i]))
          this.Urls.push(lines[i]);

        //Is it valid JSon (http://tools.ietf.org/html/rfc4627) Section 6
        if(utils.Utils.isValidJSon(lines[i]))
          this.JSonStrings.push(lines[i]);

      }
    }

    //raw data
    this.StdOut = stdout;
    this.StdErr = stderr;
    this.Error = error;
  }

}

export class FileExtractionResults
{
  public stdout: string;
  public stderr: string;
  public error: Error;

  constructor(stdout:string, stderr:string, error: Error){
    this.stdout = stdout;
    this.stderr = stderr;
    this.error = error;
  }
}
