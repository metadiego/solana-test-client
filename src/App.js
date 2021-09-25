import './App.css';
import React from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import NetworkConnectionStatus from './components/NetworkConnectionStatus/NetworkConnectionStatus';
import GenerateAccountStep from './components/GenerateAccountStep/GenerateAccountStep';
import GetAccountInfoStep from './components/GetAccountInfoStep/GetAccountInfoStep';
import TokenTransactionStep from './components/TokenTransactionStep/TokenTransactionStep';
import {establishConnection, generateKeyPair, fundAccountWithLamports} from './solanaClient.js';

/// Holds the contents of a single tab.
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {tabValue: 0};
  }

  handleTabChange(event, newValue) {
    this.setState({
      ...this.state,
      tabValue: newValue,
    });
  };

  // Establish a connection with Solana Dev Network on page load.
  async componentDidMount() {
    let {connection, version} = await establishConnection();
    this.setState({
      tabValue: this.state.tabValue,
      connection: connection,
      version: version
    });
  }

  async handleCreateAccount(accountBalance, programId, spaceInBytes) {
    let keypair = await generateKeyPair();
    let newAccount = {};
    if (!!programId || !!spaceInBytes) {
      // TODO: add logic to create an account owned by a program.
      // newAccount = {keypair: keypair, balance: balance, programId: programId, spaceInBytes: spaceInBytes};
    } else {
      let balance = await fundAccountWithLamports(this.state.connection, keypair.publicKey, accountBalance);
      newAccount = {keypair: keypair, balance: balance};
    }
    this.setState({
      tabValue: this.state.tabValue,
      connection: this.state.connection,
      version: this.state.version,
      accounts: !!this.state.accounts ? this.state.accounts.concat(newAccount) : [newAccount]
    });
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
          <h2>Each tab exposes different utility methods to interact with the Solana Blockchain:</h2>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={this.state.tabValue}
                  onChange={(evt, newValue) => this.handleTabChange(evt, newValue)}>
                  <Tab label="Create Account" />
                  <Tab label="Get Account Information" />
                  <Tab label="Token Transaction" />
                </Tabs>
              </Box>
              <TabPanel value={this.state.tabValue} index={0}>
                <GenerateAccountStep
                  handleCreateAccount={(balance) => this.handleCreateAccount(balance)}
                  accounts={this.state.accounts}/>
              </TabPanel>
              <TabPanel value={this.state.tabValue} index={1}>
                <GetAccountInfoStep connection={this.state.connection}/>
              </TabPanel>
              <TabPanel value={this.state.tabValue} index={2}>
                <TokenTransactionStep connection={this.state.connection}/>
              </TabPanel>
            </Box>
        </div>
      </div>
    );
  }
}

export default App;
