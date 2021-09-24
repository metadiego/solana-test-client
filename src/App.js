import './App.css';
import React from 'react';
import {establishConnection, generateKeyPair, fundAccountWithLamports, checkProgramDeployment} from './solanaClient.js';

import NetworkConnectionStatus from './components/NetworkConnectionStatus/NetworkConnectionStatus';
import GenerateKeyPairStep from './components/GenerateKeyPairStep/GenerateKeyPairStep';
import StepComplete from './components/StepComplete/StepComplete';
import FundAccountStep from './components/FundAccountStep/FundAccountStep';
import CheckProgramDeployment from './components/CheckProgramDeployment/CheckProgramDeployment';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  // Establish a connection with Solana Dev Network on page load.
  async componentDidMount() {
    let {connection, version} = await establishConnection();
    this.setState({
      connection: connection,
      version: version
    });
  }

  async handleGenerateKeyPair() {
    let keypair = await generateKeyPair();
    this.setState({
      connection: this.state.connection,
      version: this.state.version,
      keypair: keypair
    });
  }

  async handleFundAccount() {
    if (this.state.connection == null
      || this.state.keypair.publicKey == null) {
      return;
    }
    let accountBalance = await fundAccountWithLamports(this.state.connection, this.state.keypair.publicKey);
    this.setState({...this.state, accountBalanceLamports: accountBalance});
  }

  async handleCheckProgramDeployment(programId) {
    await checkProgramDeployment(programId);
    this.setState({...this.state, programId: programId})
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          Simple Solana Client
        </header>
        <div className="app-contents">
          <NetworkConnectionStatus
            connection={this.state.connection}
            version={this.state.version}
          />
          <h2>To interact with your smart contract please follow the steps
          below, in order:</h2>
          <StepComplete
            isComplete={!!this.state.connection}
            instructions="1. Verify Devnet Connection Status = SUCCESS. (ERROR indicates that Solana Dev Cluster is down)."/>
          <GenerateKeyPairStep
            handleClick={() => this.handleGenerateKeyPair()}
            keypair={this.state.keypair ? this.state.keypair : {}}/>
          <FundAccountStep
            accountBalanceLamports={this.state.accountBalanceLamports ? this.state.accountBalanceLamports : 0}
            handleClick={() => this.handleFundAccount()}/>
          <CheckProgramDeployment
            isProgramDeployed={!!this.state.programId}
            handleClick={(id) => this.handleCheckProgramDeployment(id)}/>
        </div>
      </div>
    );
  }

}

export default App;
