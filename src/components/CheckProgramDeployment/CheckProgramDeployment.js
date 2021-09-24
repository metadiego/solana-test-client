import StepComplete from '../StepComplete/StepComplete';
import {useState} from 'react';
import Button from '@mui/material/Button';
import './CheckProgramDeployment.css';
import TextField from '@mui/material/TextField';

const CheckProgramDeployment = ({handleClick, isProgramDeployed}) => {
  let instructions = useState('4. Before proceeding, we must verify that your '
  + 'test program was successfully deployed to the Solana Dev Net (as a sanity '
  + 'check you can verify this ID: D8Cnv1UcThay2WijWP4SQ8G683UuVsKPaZEU7TNVKW1j):');
  let [programId, setProgramId] = useState('');

  return (
    <div>
      <StepComplete
        instructions={instructions}
        isComplete={isProgramDeployed}/>
        <div className="program-deployment-display">
          <div className="program-id-input">Program ID:
            <span className="program-id-input-text">
              <TextField
                size="small"
                id="outlined-basic"
                label="Program ID"
                variant="outlined"
                onChange={(evt) => setProgramId(evt.target.value)}/>
            </span>
            <Button
              className="program-id-input-button"
              variant="outlined"
              onClick={() => handleClick(programId)}>
                Verify Deployment
            </Button>
          </div>
          <div className="program-deployment-status">Program Deployment Status:
            <span className={isProgramDeployed ? "green-text" : "red-text" }>
              {isProgramDeployed ? ' DEPLOYED' : ' NOT DEPLOYED'}
            </span>
          </div>
        </div>
    </div>
  )
}

export default CheckProgramDeployment;
