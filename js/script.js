class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
            resultsTable: [],
        }
    }
    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    reset() {
        this.setState({
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        });
    }
    
    step() {
        if (!this.running) return;
        this.calculate();
        console.log(this.format())
    }

    calculate() {
        this.setState({milliseconds: this.state.milliseconds + 1});
        if (this.state.milliseconds >= 100) {
            this.setState({seconds: this.state.seconds + 1});
            this.setState({milliseconds: 0});
        }
        if (this.state.seconds >= 60) {
            this.setState({minutes: this.state.minutes + 1});
            this.setState({seconds: 0});
        }
    }
    format() {
        return `${pad0(this.state.minutes)}:${pad0(this.state.seconds)}:${pad0(Math.floor(this.state.miliseconds))}`;
    }
    results() {
        const result = this.format();
        this.setState({
          resultsTable: [...this.resultsTable, result]
        });
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
                <a className="btn btn-warning" href="#" onClick={this.results.bind(this)}>
                    Save results
                </a>
                <a className="btn btn-warning" href="#" onClick={this.resetResults.bind(this)}>
                    Clean results
                </a>
            </div>
            <div className="stoper">{this.format.bind(this)}</div>
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
/*class Display extends React.Component {
    render() {
      return React.createElement(
        "li", { className: "list-item" }, this.times);
    }
}*/
 
class App extends React.Component {
    render() {
      return <div>
          <Stopwatch />
      </div>
    }
}  

var app = React.createElement(App, null);
ReactDOM.render(app, document.getElementById("app"));