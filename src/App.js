import './App.css';
// import * as solanaWeb3 from '@solana/web3.js';
import React from 'react';

import {establishConnection} from './solanaClient.js';

import NetworkConnectionStatus from './components/NetworkConnectionStatus/NetworkConnectionStatus';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() {
    let connection = await establishConnection();
    this.setState({
      connection: connection
    });
  }
  // Establish a connection with Solana Dev Network.
  // useEffect(() => {
  //   async function fetchData() {
  //      return establishConnection();
  //   }
  //   let connection = fetchData();
  //   this.setState((state) => {
  //     return {connection: connection}
  //   });
  // }, []);

  render() {
    return (
      <div className="app">
        <header className="app-header">
          Simple Solana Client
        </header>
        <div className="app-contents">
          <NetworkConnectionStatus
            connection={this.state.connection}
          />
          <h2>To interact with your smart contract please follow the steps below, in order:</h2>
          <p>1. Verify Devnet Connection Status = SUCCESS</p>
          <p></p>
        </div>
      </div>
    );
  }

}

export default App;
