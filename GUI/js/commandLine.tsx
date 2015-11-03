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

  keyUp: function(event){
    console.log("typing command");
    console.log(event);

    switch(event.keyCode){
      case 38: /*up arrow*/
        this.setState(function(previousState){
          var newIndex = previousState.historyIndex == 0 ? previousState.commandHistory.length -1 : previousState.historyIndex-1;
          event.target.value = this.state.commandHistory[newIndex];
          return {commandHistory: previousState.commandHistory, historyIndex: newIndex}
        });
        break;
      case 40: /*down arrow*/
        this.setState(function(previousState){
          var newIndex = previousState.historyIndex == previousState.commandHistory.length - 1 ? 0 : previousState.historyIndex+1;
          event.target.value = this.state.commandHistory[newIndex];
          return {commandHistory: previousState.commandHistory, historyIndex: newIndex}
        });
        break;
      case 13: /*enter*/
        this.executeNewCommand(event.target.value);
        event.target.value="";
        break;
    }
  },

  typingCommand: function(event){
    //Context help
  },

  render: function() {
    return (
      <div id="commandLine" className="row fullWidth">
        <div className="small-12 columns">
          <input type="text" placeholder="cmd" name="commandLine" onKeyUp={this.keyUp}/>
        </div>
      </div>
    )
  }

});
