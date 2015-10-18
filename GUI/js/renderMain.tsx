var ReactDOM = require('react-dom');
var guiOutWindow = require('./outputWindow');

ReactDOM.render(
  <guiOutWindow.OutputWindow title="test" />,
  document.getElementById('windowsContainer')
);
