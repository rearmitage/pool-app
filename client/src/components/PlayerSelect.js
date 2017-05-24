import React, { Component } from 'react';
import PlayerForm from './PlayerForm';
import AnimateHeight from '../../node_modules/react-animate-height';

class PlayerSelect extends Component {
  constructor(props) {
    super(props)
    this.displayError = this.displayError.bind(this);
    this.state = {
     alertMessage: true,
     errorHeight: 0
    }
  }

  displayError(errorMessage) {
    this.setState({
      alertMessage: true,
      errorHeight: 'auto'
    });
    setTimeout( () => {
      this.setState({errorHeight: 0})
    }, 5000 );
  }

  selectPlayers(e) {
    e.preventDefault();
    let player1 = this.props.players.find(player => player.name === this.refs.Player1.value);
    let player2 = this.props.players.find(player => player.name === this.refs.Player2.value);
    if (player1._id === player2._id) {
      this.displayError();
      return
    }
    this.props.startGame({player1, player2})
  }

  render() {
    return (
      <div>
        <AnimateHeight
          duration={ 500 }
          height={ this.state.errorHeight }
          hidden={this.state.alertMessage}>
          <div className="alert alert-danger" role="alert" hidden={!this.state.alertMessage}>Must Choose 2 different players</div>
        </AnimateHeight>
        <form onSubmit={this.selectPlayers.bind(this)}>
          <div className="form-group">
            <label htmlFor="name">Player 1</label>
            <select className="form-control" ref="Player1">
              {
                this.props.players.map((player) => {
                  return  <option key={player._id}>{player.name}</option>
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name">Player 2</label>
            <select className="form-control" ref="Player2">
              {
                this.props.players.map((player) => {
                  return  <option key={player._id}>{player.name}</option>
                })
              }
            </select>
          </div>
          <button className="btn btn-primary">Start New Game</button>
        </form>
        <PlayerForm onPlayerAdd={this.props.onPlayerAdd} />
         <button className="btn btn-primary pull-right" onClick={this.props.reset}>Back to Leaderboard</button>
      </div>
    );
  }
}

export default PlayerSelect;