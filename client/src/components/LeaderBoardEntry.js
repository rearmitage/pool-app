import React, { Component } from 'react';

class LeaderBoardEntry extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.player.name}</td>
        <td style={{"text-align": "center"}}>{this.props.player.wins}</td>
      </tr>
    );
  }
}

export default LeaderBoardEntry;