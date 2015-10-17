var ReactDOM = require('react-dom');
var guiOutWindow = require('./outputWindow');

setInterval(function() {
}, 500);

ReactDOM.render(
  <guiOutWindow.OutputWindow title="test" />,
  document.getElementById('example')
);
