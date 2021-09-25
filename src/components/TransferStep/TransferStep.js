import Button from '@mui/material/Button';
import './TransferStep.css';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import {transfer} from '../../solanaClient.js';

const TransferBalanceStep = ({handleTransfer}) => {
  let [fromPublicKey, setFromPublicKey] = useState(0);
  let [fromPrivateKey, setFromPrivateKey] = useState(0);
  let [toPublicKey, setToPublicKey] = useState(0);
  let [ammount, setAmmount] = useState(0);

  const handleInitiateTransfer = () => {
    transfer(fromPublicKey, fromPrivateKey, toPublicKey, ammount);
  }

  return (
    <div>
      <p>Transfer between accounts:</p>
      <div className="transfer-creation-panel">
        <div className="transfer-creation-panel-inputs">
          <div className="transfer-input-field">
            <div className="transfer-input-descriptor"> From account:</div>
            <TextField
              required
              fullWidth
              size="dense"
              id="outlined-basic"
              label="Public Key"
              variant="outlined"
              margin="normal"
              onChange={(evt) => setFromPublicKey(evt.target.value)}/>
              <TextField
                required
                fullWidth
                size="dense"
                id="outlined-basic"
                label="Private Key"
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

export default TransferBalanceStep;
