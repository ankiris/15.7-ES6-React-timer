class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          running: false,
          miliseconds: 0,
          seconds: 0,
          minutes: 0,
          resultsTable: []
        };
    }
    
    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }
    print() {
        this.display.innerText = this.format(this.times);
    }
    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }
    results() {
        const result = this.format();
        this.setState({
          resultsTable: [...this.state.resultsTable, result]
        });
      }
    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    step() {
        if (!this.running) return;
        this.calculate();
        this.print();
    }
    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >= 100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
    }
    stop() {
        this.running = false;
        clearInterval(this.watch);
    }
    resetResults() {
        this.setState({
          resultsTable: []
        });
    }
    render() {
        const resultsElement = this.state.resultsTable.map((time, key) => (
          <Display key={key} time={time} />
        ));
        return (
          <div className="container">
            <div className="buttons">
                <a className="btn btn-warning" href="#" onClick={this.start.bind(this)}>
                    Start
                </a>
                <a className="btn btn-warning" href="#" onClick={this.stop.bind(this)}> 
                    Stop 
                </a>
                <a className="btn btn-warning" href="#" onClick={this.reset.bind(this)}>
                    Reset
                </a>
                <a className="btn btn-warning" href="#" onClick={this.savedTime.bind(this)}>
                    Save results
                </a>
                <a className="btn btn-warning" href="#" onClick={this.cleanResults.bind(this)}>
                    Clean results
                </a>
            </div>
            <div className="stoper">{this.format()}</div>
            <div className="results-list">
              <ol className="list">{resultsElement}</ol>
            </div>
          </div>
        );
      }
}

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}
class Display extends React.Component {
    render() {
      return React.createElement(
        "li", { className: "list-item" }, this.props.time);
    }
}

  
class App extends React.Component {
    render() {
      return React.createElement( "div",{} , React.createElement(Timer, null)
      );
    }
}  


var app = React.createElement(App, null);
ReactDOM.render(app, document.getElementById("app"));