import {useState} from 'react';
import Button from '@mui/material/Button';
import './GetAccountInfoStep.css';
import TextField from '@mui/material/TextField';
import {getAccountInfo} from '../../solanaClient.js';

const GetAccountInfoStep = ({connection}) => {
  let [id, setId] = useState('');
  let [accountInfo, setAccountInfo] = useState({});


  const handleGetAccountInfo = async () => {
    try {
      let info = await getAccountInfo(connection, id);
      setAccountInfo({
        type: (info.executable ? 'EXECUTABLE' : 'NON-EXECUTABLE'),
        balance: info.lamports,
        owner: info.owner.toString()});
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
        <div className="account-info-panel">
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
    </div>
  )
}

export default GetAccountInfoStep;
