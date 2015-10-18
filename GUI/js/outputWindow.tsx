class OutputWindowProps {
  title: string;
}

class TimedLine {
  timeStamp: Date;
  lineContents: string;
}

export var OutputWindow = React.createClass<OutputWindowProps, any>({
  getInitialState: function(){
    return {outputLines: []}
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

  componentDidMount: function(){
    var element = document.getElementById(this.props.title+'-grid-snap'),
        x = 0, y = 0;

    interact(element)
      .draggable({
        snap: {
          targets: [
            interact.createSnapGrid({ x: 30, y: 30 })
          ],
          range: Infinity,
          relativePoints: [ { x: 0, y: 0 } ]
        },
        inertia: true,
        restrict: {
          restriction: element.parentNode,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: true
        }
      })
      .on('dragmove', function (event) {
        x += event.dx;
        y += event.dy;

        event.target.style.webkitTransform =
        event.target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
      });

  },

  render: function() {
    return (
      <div id={this.props.title + '-grid-snap'} className="outputWindow">
        <div className="topBar">
          <div className="title"><p>{this.props.title}</p></div>
        </div>
        <div className="contents">
          <ul className="lines">
            {
              this.state.outputLines.map(function(line: TimedLine, i: number){
                return(
                  <li key={i} className="line">
                    <p>[{line.timeStamp.toTimeString().split(' ')[0]}] {line.lineContents}</p>
                  </li>
                );
            })
          }
          </ul>
        </div>
        <div className="actions">
          <p onClick={this.clearWindow}>Clear</p>
          <p onClick={this.addLine}>AddLineForTest</p>
        </div>
      </div>
    );
  }
});
