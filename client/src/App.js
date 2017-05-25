import React, { Component } from 'react';
import LeaderBoard from './components/LeaderBoard';
import PlayerSelect from './components/PlayerSelect';
import Match from './components/Match'
import axios from '../node_modules/axios'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.onPlayerAdd = this.onPlayerAdd.bind(this);
    this.startGame = this.startGame.bind(this);
    this.chooseWinner = this.chooseWinner.bind(this);
    this.setup = this.setup.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
     players: [],
     setup: false,
     base: true,
     match : {
       player1: {},
       player2: {},
       inProgress: false
     }
    }
  }

  componentDidMount() {
    axios.get('/player')
     .then(res => {
      res.data.sort((a,b) => b.wins - a.wins);
      this.setState({players: res.data});
    })
    .catch(err => {
      console.log(err);
    });
  }

  setup() {
    this.setState({
      base: false,
      setup: true
    });
  }

  onPlayerAdd(player) {
    let newState = this.state.players.concat(player);
    this.setState({ players: newState });
  }

  startGame(opponents){
    this.setState({
      setup: false,
      match: {
        player1: opponents.player1,
        player2: opponents.player2,
        inProgress: true
      }
    });
  }

  chooseWinner(winner) {
    axios.put(`/player/${winner._id}`, winner)
      .then(res => {
        let players = this.state.players.filter(a => a._id !== res.data._id);
        players.push(res.data);
        players.sort((a,b) => b.wins - a.wins);
        this.setState({
          base: true,
          players: players,
          match : {
            player1: {},
            player2: {},
            inProgress: false
          }
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  reset(){
    this.setState({
     base: true,
     setup: false,
     match : {
       player1: {},
       player2: {},
       inProgress: false
     }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="main col-sm-8 col-sm-offset-2 col-lg-4 col-lg-offset-4">
            <div className="panel panel-default">
              <div className="panel-body">
                <h2 style={{"textAlign": "center"}}>O<span className="sup">3</span> Plays Pool</h2>
                {this.state.base ? <LeaderBoard setup={this.setup} players={this.state.players} /> : null}
                {this.state.setup ?  <PlayerSelect startGame={this.startGame} players={this.state.players} onPlayerAdd={this.onPlayerAdd} reset={this.reset}/> : null }
                {
                  this.state.match.inProgress ?  <Match
                    player1={this.state.match.player1}
                    player2={this.state.match.player2}
                    chooseWinner={this.chooseWinner}
                    reset={this.reset}
                /> : null }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;


// {
//               !this.state.match.inProgress ? (
//                   <div className="row">
//                     <div className="col-md-3">
//                       <LeaderBoard players={this.state.players} />
//                     </div>
//                     <div className="col-md-3">
//                       <PlayerForm onPlayerAdd={this.onPlayerAdd}/>
//                     </div>
//                     <div className="col-md-3">
//                       <PlayerSelect startGame={this.startGame} players={this.state.players}/>
//                     </div>
//                   </div>
//             ):
//             (
//               <div className="col-md-4 col-md-offset-4">
//                 <Match
//                   player1={this.state.match.player1}
//                   player2={this.state.match.player2}
//                   chooseWinner={this.chooseWinner}
//                 />
//               </div>
//             )}