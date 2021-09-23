import './FundAccountStep.css';
import StepComplete from '../StepComplete/StepComplete';
import {useState} from 'react';
import Button from '@mui/material/Button';

const FundAccountStep = ({handleClick, accountBalanceLamports}) => {
  let instructions = useState('3. Request airdrop for your account.');

  return (
    <div>
      <StepComplete instructions={instructions} isComplete={true}/>
      <div className="balance-display">
        <div className="balance-element">Account Balance (lamports):
          <div className="balance-ammount">{accountBalanceLamports ? accountBalanceLamports : 0}</div>
        </div>
        <Button variant="outlined" onClick={handleClick}>Request Airdrop</Button>
      </div>
    </div>
  )
}

export default FundAccountStep;
