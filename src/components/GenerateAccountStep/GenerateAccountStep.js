import Button from '@mui/material/Button';
import './GenerateAccountStep.css';
import AccountData from '../AccountData/AccountData';
import {useState} from 'react';
import TextField from '@mui/material/TextField';

const GenerateAccountStep = ({handleCreateAccount, accounts}) => {
  let [accountData, setAccountData] = useState({});

  const setAccountBalance = (balance) => {
    setAccountData({...accountData, balance: balance})
  }

  const setAccountProgramId = (programId) => {
    setAccountData({...accountData, programId: programId})
  }

  const setAccountSpaceBytes = (space) => {
    setAccountData({...accountData, spaceInBytes: space})
  }

  const handleGenerateAccount = () => {
    handleCreateAccount(parseInt(accountData.balance));
  }

  return (
    <div>
      <p>Generate the accounts you need:</p>
      <div className="account-creation-panel">
        <div className="account-input-field">
          <div className="account-input-descriptor"> Starting balance for account:</div>
          <TextField
            required
            fullWidth
            size="dense"
            label="Funds (Lamports)"
            variant="outlined"
            margin="normal"
            onChange={(evt) => setAccountBalance(evt.target.value)}/>
        </div>
        <div className="account-advanced-options">
          <p>Advanced Optional Parameters (only necessary when creating an account
            that will be used by a program for storage):</p>
          <div>
            <div className="account-input-field">
              <div className="account-input-descriptor">Program ID which owns this account (leave blank if none):</div>
              <TextField
                fullWidth
                size="dense"
                label="Program ID (Optional)"
                variant="outlined"
                margin="normal"
                onChange={(evt) => setAccountProgramId(evt.target.value)}/>
            </div>
            <div className="account-input-field">
              <div className="account-input-descriptor">Space (in bytes) to allocate to this account (leave blank if none):</div>
              <TextField
                fullWidth
                size="dense"
                label="Account Space in Bytes (Optional)"
                variant="outlined"
                margin="normal"
                onChange={(evt) => setAccountSpaceBytes(evt.target.value)}/>
            </div>
          </div>
        </div>
        <div className="create-account-button">
          <Button
            size="large"
            variant="outlined"
            margin="normal"
            onClick={() => handleGenerateAccount()}>Generate Account</Button>
        </div>
      </div>

      {!! accounts &&
      <div className="accoounts-list">
        {!!accounts && accounts.map(({keypair, balance}) => {
          return <AccountData
                   key={keypair.publicKey.toString()}
                   publicKey={keypair.publicKey}
                   privateKey={keypair.privateKey}
                   balance={balance}/>
        })}
        </div>
      }
    </div>
  )
}

export default GenerateAccountStep;
