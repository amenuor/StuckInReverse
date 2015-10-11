import sirModel = require('./SIRModel');

export class SIRController{
  public CurrentModel : sirModel.SIRModel;

  constructor(){
    this.CurrentModel = new sirModel.SIRModel();
  }
}
