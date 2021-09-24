import StepComplete from '../StepComplete/StepComplete';
import {useState} from 'react';
import Button from '@mui/material/Button';
import './CheckProgramDeployment.css';

const CheckProgramDeployment = ({handleClick, isProgramDeployed}) => {
  let instructions = useState('4. Before proceeding, we must verify that your test program was successfully deployed to the Solana Dev Net:');

  return (
    <div>
      <StepComplete
        instructions={instructions}
        isComplete={isProgramDeployed}/>
        <div className="program-deployment-display">
          <div className="program-id">Program ID:
            <input type="text"></input>
          </div>
          <div className="program-id">Program Deployment Status:
            <div className="program-status">DEPLOYMENT VERIFIED</div>
          </div>
          <Button variant="outlined" onClick={handleClick}>Request Airdrop</Button>
        </div>
    </div>
  )
}

export default CheckProgramDeployment;
