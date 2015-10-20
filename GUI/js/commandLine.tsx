class CommandLineProps {
}

export var CommandLine = React.createClass<CommandLineProps, any>({
  getInitialState: function(){
    return {commandHistory: [""], historyIndex: 0}
  },

  executeNewCommand: function(command){
    console.log("command to execute: " + command);
    this.setState(function(previousState){
      previousState.commandHistory.push(command);
      return {commandHistory: previousState.commandHistory, historyIndex: 0}
    });
  },

  keyDown: function(event){
    console.log("typing command");
    console.log(event);

    switch(event.keyCode){
      case 38: /*up arrow*/
        this.setState(function(previousState){
          return {commandHistory: previousState.commandHistory, historyIndex: previousState.historyIndex == 0 ? previousState.commandHistory.length : previousState.historyIndex-1}
        });
        break;
      case 40: /*down arrow*/
        this.setState(function(previousState){
          return {commandHistory: previousState.commandHistory, historyIndex: previousState.historyIndex == previousState.commandHistory.length ? 0 : previousState.historyIndex+1}
        });
        break;
      case 13: /*enter*/
        this.executeNewCommand(event.target.value);
        break;
      default:
        event.target.value+=event.key
        break;
    }
  },

  typingCommand: function(event){
    //Context help
  },

  render: function() {
    var value = this.state.commandHistory[this.state.historyIndex];
    return (
      <div id="commandLine" className="row fullWidth">
        <div className="small-12 columns">
          <input type="text" placeholder="cmd" name="commandLine" value={value} onChange={this.typingCommand} onKeyDown={this.keyDown}/>
        </div>
      </div>
    )
  }

});
