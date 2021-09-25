import {useState} from 'react';
import Button from '@mui/material/Button';
import './GetAccountInfoStep.css';
import TextField from '@mui/material/TextField';
import {getAccountInfo} from '../../solanaClient.js';
import {TargetAccount, TargetAccountShema} from './AccountDataSpec';
import * as borsh from 'borsh';

const GetAccountInfoStep = ({connection}) => {
  let [id, setId] = useState('');
  let [accountInfo, setAccountInfo] = useState({});
  let [processedAccountData, setProcessAccountData] = useState({});

  const handleGetAccountInfo = async () => {
    try {
      let info = await getAccountInfo(connection, id);
      setAccountInfo({
        type: (info.executable ? 'EXECUTABLE' : 'NON-EXECUTABLE'),
        balance: info.lamports,
        owner: info.owner.toString()});
      if (!!info.data) {
        setProcessAccountData(borsh.deserialize(
          TargetAccountShema,
          TargetAccount,
          accountInfo.data,
        ));
      }
    } catch {
      setAccountInfo({notExists: true});
    }
  }

  return (
    <div>
     <p>Get information about an account (as a sanity check you can use the following account:
        D8Cnv1UcThay2WijWP4SQ8G683UuVsKPaZEU7TNVKW1j):</p>
        <div className="account-info-display">
          <div className="account-public-key-input">Account/Program Public Key:
            <span className="account-public-key-input-text">
              <TextField
                required
                fullWidth
                label="Account/Program ID"
                variant="outlined"
                onChange={(evt) => setId(evt.target.value)}/>
            </span>
            <Button
              size="large"
              variant="outlined"
              onClick={() => handleGetAccountInfo()}>
                Get Info
            </Button>
          </div>
        </div>
        {Object.keys(accountInfo).length > 0 && <div className="account-info-panel">
          {!!accountInfo.notExists
            ? (<h4>Account/Program not found.</h4>)
            : (<>
                 <h4>Account/Program Information:</h4>
                 <p>Type: {accountInfo.type}</p>
                 <p>Balance: {accountInfo.balance} lamports</p>
                 <p>Owner: {accountInfo.owner}</p>
               </>
             )
           }
        </div>
      }
      {!!processedAccountData && <div className="account-data-panel">
        <h4>Account Data:</h4>
         <p>TODO:specify how you would like to render the account data. You must
          modify ./AccountDataSpec to specify how to desiralize the account.
          Then the variable 'processedAccountData' will contain the Information
          of the deserialized object.
         </p>
      </div>
      }
    </div>
  )
}

export default GetAccountInfoStep;
