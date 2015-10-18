var ReactDOM = require('react-dom');
var guiOutWindow = require('./outputWindow');
var now = new Date();

var pres = [{timeStamp:now, lineContents: '_______ __               __     _______         ______                                     '},
{timeStamp:now, lineContents:'|     __|  |_.--.--.----.|  |--.|_     _|.-----.|   __ \.-----.--.--.-----.----.-----.-----.'},
{timeStamp:now, lineContents:'|__     |   _|  |  |  __||    <  _|   |_ |     ||      <|  -__|  |  |  -__|   _|__ --|  -__|'},
{timeStamp:now, lineContents:'|_______|____|_____|____||__|__||_______||__|__||___|__||_____|\___/|_____|__| |_____|_____|'}];

ReactDOM.render(
  <guiOutWindow.OutputWindow title="Console Output" elementID="consoleOutput" initLines={pres}/>,
  document.getElementById('windowsContainer')
);
