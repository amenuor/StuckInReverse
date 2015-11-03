class OutputWindowProps {
  title: string;
  elementID: string;
  initLines: TimedLine[];
}

class TimedLine {
  timeStamp: Date;
  lineContents: string;
}

export var OutputWindow = React.createClass<OutputWindowProps, any>({
  getInitialState: function(){
    return {outputLines: this.props.initLines.slice(0)}
  },

  addOutputLine: function(outputLine: TimedLine){
    this.setState(function(previousState){
      previousState.outputLines.push(outputLine);
      return {outputLines: previousState.outputLines}
    });
  },

  clearWindow: function(event)
  {
    this.setState(this.getInitialState());
  },

  addLine: function(){
    this.addOutputLine({timeStamp: new Date(), lineContents: "test"});
  },

  dragMoveListener: function(event) {
      var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    },

  componentDidMount: function(){
    var element = document.getElementById(this.props.elementID),
        x = 0, y = 0;

    interact(element)
      .draggable({
        inertia: true,
        restrict: {
          restriction: element.parentNode,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: true
        },
        autoScroll: true,
        onmove: this.dragMoveListener

      })
      .resizable({
        preserveAspectRatio: false,
        edges: { left: true, right: true, bottom: true, top: true }
      })
      .on('dragmove', function (event) {
        x += event.dx;
        y += event.dy;

        event.target.style.webkitTransform =
        event.target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
      })
      .on('resizemove', function (event) {
          var target = event.target,
              x = (parseFloat(target.getAttribute('data-x')) || 0),
              y = (parseFloat(target.getAttribute('data-y')) || 0);

          // update the element's style
          target.style.width  = event.rect.width + 'px';
          target.style.height = event.rect.height + 'px';

          // translate when resizing from top or left edges
          x += event.deltaRect.left;
          y += event.deltaRect.top;

          target.style.webkitTransform = target.style.transform =
              'translate(' + x + 'px,' + y + 'px)';

          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        });
  },

  render: function() {
    return (
      <div id={this.props.elementID} className="outputWindow">
        <div className="topBar">
          <div className="title"><p>{this.props.title}</p></div>
          <div className="controls"><div className="row"><i className="fi-page small-4 columns" onClick={this.clearWindow} title="Clear window"></i><i className="fi-minus small-4 columns" title="Minimize window"></i><i className="fi-x small-4 columns" title="Close window"></i></div></div>
        </div>
        <div className="contents">
          <ul className="lines">
            {
              this.state.outputLines.map(function(line: TimedLine, i: number){
                return(
                  <li key={i} className="line">
                    <pre className="timestamp">[{line.timeStamp.toTimeString().split(' ')[0]}]</pre><pre className="contents">{line.lineContents}</pre>
                  </li>
                );
            })
          }
          </ul>
        </div>
        <div className="actions">
          <p onClick={this.addLine}>AddLineForTest</p>
        </div>
      </div>
    );
  }
});
