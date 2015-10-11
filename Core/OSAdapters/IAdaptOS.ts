export interface IAdaptOS{
  performStaticAnalysis(callback:Function):void;
  pathValidation(path:string):boolean;
}
