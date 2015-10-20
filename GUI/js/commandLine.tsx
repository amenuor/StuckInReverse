class CommandLineProps {
  test: string;
}

export var CommandLine = React.createClass<CommandLineProps, any>({
  getInitialState: function(){
    return {commandHistory: []}
  },

  render: function() {
    return (
      <div id="commandLine" className="row fullWidth">
        <div className="small-12 columns">
          <input type="text" placeholder="cmd" name="commandLine"/>
        </div>
      </div>
    )
  }

});
