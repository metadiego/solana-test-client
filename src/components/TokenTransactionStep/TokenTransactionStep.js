import Button from '@mui/material/Button';
import './TokenTransactionStep.css';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import {transfer} from '../../solanaClient.js';

const TokenTransactionStep = ({connection}) => {
  let [fromPublicKey, setFromPublicKey] = useState(0);
  let [fromPrivateKey, setFromPrivateKey] = useState(0);
  let [toPublicKey, setToPublicKey] = useState(0);
  let [ammount, setAmmount] = useState(0);

  const handleInitiateTransfer = () => {
    transfer(connection, fromPublicKey, fromPrivateKey, toPublicKey, ammount);
  }

  return (
    <div>
      <p>Transfer tokens between accounts:</p>
      <div className="transfer-creation-panel">
        <div className="transfer-creation-panel-inputs">
          <div className="transfer-input-field">
            <div className="transfer-input-descriptor"> From account:</div>
            <TextField
              required
              fullWidth
              size="dense"
              label="Public Key"
              variant="outlined"
              margin="normal"
              onChange={(evt) => setFromPublicKey(evt.target.value)}/>
              <TextField
                required
                fullWidth
                size="dense"
                label="Private Key (will be cast to Javascript Uint8Array)"
                variant="outlined"
                margin="normal"
                onChange={(evt) => setFromPrivateKey(evt.target.value)}/>
              <TextField
                fullWidth
                size="dense"
                label="Ammount (Lamports)"
                variant="outlined"
                margin="normal"
                onChange={(evt) => setAmmount(evt.target.value)}/>
          </div>
          <div className="transfer-input-field">
            <div className="transfer-input-descriptor">To Account:</div>
            <TextField
              fullWidth
              size="dense"
              label="Parent Account ID (Optional)"
              variant="outlined"
              margin="normal"
              onChange={(evt) => setToPublicKey(evt.target.value)}/>
          </div>
        </div>
        <div className="transfer-button">
          <Button
            size="large"
            variant="outlined"
            onClick={() => handleInitiateTransfer()}>Transfer</Button>
        </div>
      </div>
  </div>
  )
}

export default TokenTransactionStep;
