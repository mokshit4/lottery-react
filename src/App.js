import React, {Component} from 'react';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component{

    state = {
        manager: '',
        players: [],
        balance: '',
        value: '',
        message: ''
    };
    async componentDidMount() {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPLayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);
      this.setState({manager: manager, players: players, balance: balance});
    }
    onSubmit = async (event) => {
      event.preventDefault();
      const accounts = await web3.eth.getAccounts();
      this.setState({message: 'Waiting for transaction success ...'});
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });
      this.setState({message: 'you have entered!'});
    }
    onClick = async () => {
      const accounts = await web3.eth.getAccounts();
      this.setState({message: 'Waiting for transaction success ...'});
      await lottery.methods.pickUpWinner().send({
        from: accounts[0]
      });
      this.setState({message: 'winner has been chosen, check your wallets'});
    }
  render() {
    return (
      <div>
        <h2>Lottery Contract </h2>
        <p>this contract is managed by {this.state.manager}</p>
        <p>there are {this.state.players.length} entered in the lottery contract,
         and the contract has {web3.utils.fromWei(this.state.balance, 'ether')} ether</p>
         <hr />
         <form onSubmit={this.onSubmit}>
          <h2>Want to try your luck</h2>
          <div>
            <label>amount of ether to enter</label>
            <input value={this.state.value} onChange = {event => this.setState({value: event.target.value })}></input>
          </div>
          <button>Enter</button>
         </form>
         <hr />
         <form onClick={this.onClick}>
          <h2>Ready to pick a winner</h2>
          <button>pickWinner</button>
         </form>
         <hr />
         <h3>{this.state.message}</h3>

      </div>
    );
  }
}

export default App;
