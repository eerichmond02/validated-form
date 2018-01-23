import React, { Component } from 'react';
import './App.css';

class ValidationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      nameError: '',
      emailError: '',
      nameValidated: false,
      emailValidated: false,
      status: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleInputChange(event) {
    this.setState({[event.target.name]: event.target.value});
    this.validate(event.target.name, event.target.value);
  }

  handleSubmit(event) {
    this.setState({status: 'Thanks!'})
  }

  validate(name, value){

    switch (name) {
      case 'name':
        if (/^[a-zA-Z\s\-]*$/.test(value) && value.length >= 8){
          this.setState({nameError: ''});
          this.setState({nameValidated: true})
        } else {
          this.setState({nameError: 'Must 8+ characters and contain no numbers/symbols.'});
          this.setState({nameValidated: false})
        }
        break;
      case 'email':
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
        {
          this.setState({emailError: ''});
          this.setState({emailValidated: true})
        } else {
          this.setState({emailError: 'Must be a valid email address.'});
          this.setState({emailValidated: false})
        }
        break;
    }
  }

  render() {
    if (!this.state.status) {
      return (
        <form>
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={this.state.name}
              onChange={this.handleInputChange} />
            <span className="error">{this.state.nameError}</span>
          <br />
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleInputChange} />
            <span className="error">{this.state.emailError}</span>
          <br />
            <button onClick={this.handleSubmit} disabled={!this.state.nameValidated || !this.state.emailValidated}>Submit</button>
        </form>
      );
    }
    else {
      return (
        <h3>{this.state.status}</h3>
      );
    }
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Validation Form</h1>
        </header>
        <ValidationForm />
      </div>
    );
  }
}

export default App;
