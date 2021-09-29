import Button from '@mui/material/Button';
import './TokenTransactionStep.css';
import LoadingButton from '../LoadingButton/LoadingButton.js';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import {transfer} from '../../solanaClient.js';

const TokenTransactionStep = ({connection}) => {
  let [fromPublicKey, setFromPublicKey] = useState('');
  let [fromPrivateKey, setFromPrivateKey] = useState('');
  let [toPublicKey, setToPublicKey] = useState('');
  let [ammount, setAmmount] = useState(0);

  const parsePrivateKey = (privateKeyString) =>
    setFromPrivateKey(Uint8Array.from(privateKeyString.split(',')));

  const handleInitiateTransfer = async () => {
    await transfer(connection, fromPublicKey, fromPrivateKey, toPublicKey, ammount);
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
                label="Private Key (expects comma separated list of 8 bit ints, eg: 12,233,123)"
                variant="outlined"
                margin="normal"
                onChange={(evt) => parsePrivateKey(evt.target.value)}/>
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
          <LoadingButton
            buttonLabel = "Transfer"
            handleClick = {() => handleInitiateTransfer()}/>
        </div>
      </div>
  </div>
  )
}

export default TokenTransactionStep;
