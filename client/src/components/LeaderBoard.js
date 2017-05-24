import React, { Component } from 'react';
import LeaderBoardEntry from './LeaderBoardEntry';
import '../App.css';

class LeaderBoard extends Component {
  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.props.setup}>Start New Game</button>
        <h3 style={{"textAlign": "center", "marginTtop": 20, "marginBottom": 0}}>Leaderboard</h3>
        <table className="table leaderboard">
          <thead>
            <tr>
              <th>Name</th>
              <th style={{"textAlign": "center"}}># of wins</th>
            </tr>
          </thead>
          <tbody>
            {this.props.players.map((player) => {
              return <LeaderBoardEntry  player={player} key={player._id}/>
            })}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.props.setup}>Start New Game</button>
      </div>
    );
  }
}

export default LeaderBoard;