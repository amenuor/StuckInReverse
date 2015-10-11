import sirCoreStaticAna = require('../../Core/StaticAnalysis');


/* Each model represents a specific state the application is in. It is possible to switch between multiple models at run time.
* Each instance of the model represents the current state of the analysis on a specific application */
export class SIRModel
{

  public FileName : string;
  public staticAnalysisRes : sirCoreStaticAna.StaticAnalysisResults;


}
