import Icon from '@mui/material/Icon';
import { green, red } from '@mui/material/colors';
import React from 'react';
import './StepComplete.css';

const GenerateKeyPairStep = ({instructions, isComplete}) => {
  return (
    <div className="instructions">
      <div className="icons">
        {isComplete ?
        (<Icon sx={{ color: green[500] }}>check_box</Icon>)
        : (<Icon sx={{ color: red[500] }}>cancel</Icon>)
        }
      </div>
      <p className="instructions-text">{instructions}</p>
    </div>
  );
}

export default GenerateKeyPairStep;
