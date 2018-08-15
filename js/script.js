class Stopwatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            running: false,
            minutes: 0,
            seconds: 0,
            miliseconds: 0,
            resultsTable: [],
            display: display,
        }
    }
    
    reset() {
        this.setState = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
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
        this.state.miliseconds += 1;
        if (this.state.miliseconds >= 100) {
            this.state.seconds += 1;
            this.state.miliseconds = 0;
        }
        if (this.state.seconds >= 60) {
            this.state.minutes += 1;
            this.state.seconds = 0;
        }
    }
    print() {
        this.display.innerText = this.format(this.times);
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
            <div className="stoper">{this.format}</div>
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
        "li", { className: "list-item" }, this.times);
    }
}

  
class App extends React.Component {
    render() {
      return <div>
          <Stopwatch />
      </div>
    }
}  


var app = React.createElement(App, null);
ReactDOM.render(app, document.getElementById("app"));