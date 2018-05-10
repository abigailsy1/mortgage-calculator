import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: '',
      rate: '',
      term: '',
      output: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this); 
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  calculate(event) {
    event.preventDefault();

    let balance = parseFloat(this.state.balance);
    let rate = (parseFloat(this.state.rate) / 100) / 12;
    let term = 12 * parseFloat(this.state.term);

    const output = (1+rate)**term;
    
    this.setState({output: '$' + (balance * ((rate * output) / (output - 1))).toFixed(2) + ' is your payment.'});
  }

  render() {
    return (
      <div className='container'>
       
        <h3>Mortgage Calculator</h3>
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">Loan Balance</label>
            <div className="col-sm-10">
              <input name="balance" type="number"  placeholder="Enter Loan Balance" value={this.state.balance} onChange={this.handleChange}  />
          </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Interest Rate (%)</label>
            <div className="col-sm-10">
              <input name="rate" type="number" step="0.01"  placeholder="Enter APR %" value={this.state.rate} onChange={this.handleChange} />
          </div>
          </div>

          <div className="form-group">
            <label className="col-sm-2 control-label">Loan Term (years)</label>
              <select name="term" value={this.state.term} onChange={this.handleChange}>
                <option>Options
                </option>
                <option value="15">15 Years</option>
                <option value="30">30 Years</option>
              </select>
          </div>
          <div>
            
            <button name="submit" className="btn btn-primary col-sm-offset-2 col-sm-1" onClick={this.calculate}>Calculate</button>
          </div>
          <br/>
          <div id="output" value={this.state.output}>
            <h4>{this.state.output}</h4>
          </div>
        </form>  
      </div>
    );
  }
}