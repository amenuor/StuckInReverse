export class StaticAnalysisResults
{
  public ProgramStringsExtractionResults: ProgramStringsExtractionResults;
  public FileExtractionResults: FileExtractionResults;
}

export class ProgramStringsExtractionResults
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
