var ReactDOM = require('react-dom');
var outWindow = require('./outputWindow');
var cmdLine = require('./commandLine');
var now = new Date();

var pres = [{timeStamp:now, lineContents: '_______ __               __     _______         ______                                     '},
{timeStamp:now, lineContents:'|     __|  |_.--.--.----.|  |--.|_     _|.-----.|   __ \.-----.--.--.-----.----.-----.-----.'},
{timeStamp:now, lineContents:'|__     |   _|  |  |  __||    <  _|   |_ |     ||      <|  -__|  |  |  -__|   _|__ --|  -__|'},
{timeStamp:now, lineContents:'|_______|____|_____|____||__|__||_______||__|__||___|__||_____|\___/|_____|__| |_____|_____|'}];

class WorkspaceProps {
}

export var Workspace = React.createClass<WorkspaceProps, any>({


  render: function() {
      var commandLine = (<cmdLine.CommandLine/>);
      var outputWindow = (<outWindow.OutputWindow title="Console Output" elementID="consoleOutput" initLines={pres}/>);
      return (
        <div id="contents">
          {commandLine}
          <div id="windowsContainer" className="fullWidth">
            {outputWindow}
          </div>
        </div>
      );
}});

ReactDOM.render(
  <Workspace />,
  document.getElementById('main')
);
