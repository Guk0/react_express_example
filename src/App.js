import React from 'react';
import './App.css';
import Contact from './Contact';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }
  render() {
    return(
      <div>
        <button onClick={() => {this.setState({name: 'velopert'});}}>Click me</button>
        <h1>Hellod!@! {this.state.name}</h1>
        <Contact />
      </div>
    );
  }
}

export default App;
