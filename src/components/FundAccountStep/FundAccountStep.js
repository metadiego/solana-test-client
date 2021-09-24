import './FundAccountStep.css';
import StepComplete from '../StepComplete/StepComplete';
import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { purple } from '@mui/material/colors';

const FundAccountStep = ({handleClick, accountBalanceLamports}) => {
  let instructions = useState('3. Request airdrop for your account (this may take a couple of seconds).');
  let [isLoading, setIsLoading] = useState(false);

  const handleUpdateAccountBalance = () => {
    console.log('updating');
    setIsLoading(true);
    handleClick();
  };

  useEffect(() => {
    if(accountBalanceLamports > 0) {
      setIsLoading(false);
    }
  }, [accountBalanceLamports]);

  return (
    <div>
      <StepComplete
        instructions={instructions}
        isComplete={accountBalanceLamports ? accountBalanceLamports > 0 : false}/>
      <div className="balance-display">
        <div className="balance-element">Account Balance (lamports):
          {isLoading
            ? 'Loading...'
            : <div className="balance-ammount">{accountBalanceLamports ? accountBalanceLamports : 0}</div>
          }
        </div>
        <Button variant="outlined" onClick={handleUpdateAccountBalance}>Request Airdrop</Button>
      </div>
    </div>
  )
}

export default FundAccountStep;
