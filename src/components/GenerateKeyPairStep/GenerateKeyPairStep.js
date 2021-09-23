import Button from '@mui/material/Button';
import './GenerateKeyPairStep.css';
import '../StepComplete/StepComplete';
import {useState} from 'react';


import StepComplete from '../StepComplete/StepComplete';

const GenerateKeyPairStep = ({handleClick, keypair}) => {

  let instructions = useState('2.Generate a Key-Pair to associate with your account:');
  return (
    <div>
      <StepComplete instructions={instructions} isComplete={Object.keys(keypair).length != 0}/>
      <div className="keypair-display">
        <div className="keypair-element">Public Key:
          <div className="keypair-key">{keypair.publicKey ? keypair.publicKey : ''}</div>
        </div>
        <div className="keypair-element">Private Key:
          <div className="keypair-key">{keypair.privateKey ? keypair.privateKey : ''}</div>
        </div>
        <Button variant="outlined" onClick={handleClick}>Generate Key Pair</Button>
      </div>
    </div>
  )
}

export default GenerateKeyPairStep;