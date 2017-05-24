import React, { Component } from 'react';
import axios from '../../node_modules/axios'
import AnimateHeight from '../../node_modules/react-animate-height';
import '../App.css';


class PlayerForm extends Component {
  constructor(props) {
    super(props)
    this.displayAlert = this.displayAlert.bind(this);
    this.state = {
     alertHeight: 0,
     alertMessage: '',
     alertType: '',
    }
  }

  displayAlert(alertMessage, alertType) {
    this.setState({
      alertHeight: 'auto',
      alertMessage: alertMessage,
      alertType: alertType
    });
    setTimeout( () => {
      this.setState({alertHeight: 0})
    }, 5000 );
  }

  addPlayer(e) {
    e.preventDefault();
    axios.post('/player', {
      name: this.refs.name.value
    })
    .then(res => {
      let newPlayer = res.data;
      this.props.onPlayerAdd(newPlayer);
      this.refs.name.value = '';
      let message = `${newPlayer.name} has been added`
      this.displayAlert(message, "alert alert-success");
    })
    .catch(err => {
      if (err.response.data) {
        let errMsg = err.response.data.split(':')[2];
        this.displayAlert(errMsg, "alert alert-danger");
      }
    });
  }

  render() {
    return (
      <div className="PlayerForm">
        <AnimateHeight
          duration={ 500 }
          height={ this.state.alertHeight}>
          <div className={this.state.alertType} role="alert" >{this.state.alertMessage}</div>
        </AnimateHeight>
        <form onSubmit={this.addPlayer.bind(this)}>
          <div className="form-group">
            <label htmlFor="name">Create New Player</label>
            <input id="name" type="text" className="form-control" ref="name" placeholder="Name" />
          </div>
          <button type="submit" className="btn btn-primary">Add Player</button>
        </form>
      </div>
    );
  }
}

export default PlayerForm;