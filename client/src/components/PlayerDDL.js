import React, { Component } from 'react';

class PlayerDDL extends Component {
  render() {
    return (
      <select className="form-control">
        <option disabled={true} hidden={true}>Choose Player</option>
        {
          this.props.players.map((player) => {
            return  <option key={player._id}>{player.name}</option>
          })
        }
      </select>
    );
  }
}

export default PlayerDDL;