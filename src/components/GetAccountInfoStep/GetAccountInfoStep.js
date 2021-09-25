import {useState} from 'react';
import Button from '@mui/material/Button';
import './GetAccountInfoStep.css';
import TextField from '@mui/material/TextField';
import {getAccountInfo} from '../../solanaClient.js';
// import {TargetAccount, TargetAccountShema} from './AccountDataSpec';
// import * as borsh from 'borsh';

const GetAccountInfoStep = ({connection}) => {
  let [id, setId] = useState('');
  let [accountInfo, setAccountInfo] = useState({});
  let [rawAccountData, setRawAccountData] = useState({});
  // let [processedAccountData, setProcessedAccountData] = useState({});

  const handleGetAccountInfo = async () => {
    try {
      let info = await getAccountInfo(connection, id);
      setAccountInfo({
        type: (info.executable ? 'EXECUTABLE' : 'NON-EXECUTABLE'),
        balance: info.lamports,
        owner: info.owner.toString()});
      if (!!info.data) {
        setRawAccountData(info.data);
        console.log(info.data);
        // setProcessedAccountData(borsh.deserialize(
        //   TargetAccountShema,
        //   TargetAccount,
        //   accountInfo.data,
        // ));
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
      {Object.keys(rawAccountData).length > 0 && <div className="account-data-panel">
        <h4>Account Data:</h4>
         <p>It seems like the account you have entered contains serialized data
         stored in it's data field. In order to view it, you must:</p>
         <ul>
           <li> Modify TargetAccount and TargetAccountShema to match the spec of
           the serialized data.</li>
           <li>Uncommend line 6-7.</li>
           <li>Uncommend line 13.</li>
           <li>Uncommend line 24-28.</li>
           <li>Once you complete the above steps, this template will expose the
           data object through 'processedAccountData'. You can render this data
           as you see fit.</li>
         </ul>
      </div>
      }
    </div>
  )
}

export default GetAccountInfoStep;
