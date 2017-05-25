import React, { Component } from 'react';

class Match extends Component {

  render() {
    return (
          <div className="row match">
            <div className="col-sm-5">
              <h2>{this.props.player1.name}</h2>
              <button
                className="btn btn-primary"
                onClick={() => this.props.chooseWinner(this.props.player1)}>
                Player 1 Won
              </button>
            </div>
            <div className="col-sm-2">
              <h2>vs</h2>
            </div>
            <div className="col-sm-5">
              <h2>{this.props.player2.name}</h2>
              <button
                className="btn btn-primary"
                onClick={() => this.props.chooseWinner(this.props.player2)}>
                Player 2 Won
              </button>
            </div>
            <div className="col-sm-12" style={{"margin-top": 20}}>
              <button className="btn btn-primary" onClick={this.props.reset}>Cancle Game</button>
            </div>
          </div>
    );
  }
}

export default Match;