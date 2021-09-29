import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './NetworkSelectionStep.css';

const UrlOption = {
    DEV_NET: 'DEV_NET',
    CUSTOM: 'CUSTOM'
}

const DEV_NET_URL = 'https://api.devnet.solana.com';

const NetworkSelectionStep = ({handleConnect}) => {
  const [urlOption, setUrlOption] = React.useState(UrlOption.DEV_NET)
  const [url, setUrl] = React.useState(DEV_NET_URL);

  const handleSetUrlOption = (event) => {
    if (event.target.value === UrlOption.DEV_NET) {
      setUrlOption(UrlOption.DEV_NET);
      setUrl(DEV_NET_URL);
    } else {
      setUrlOption(UrlOption.CUSTOM);
    }
  };

  return (
    <>
      <h2>Select a Solana network to connect to:</h2>
      <div className="input-container">
        <div className="input-options">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Network</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={urlOption}
              label="Network URL"
              onChange={handleSetUrlOption}
            >
              <MenuItem value={UrlOption.DEV_NET}>Dev Net</MenuItem>
              <MenuItem value={UrlOption.CUSTOM}>Custom</MenuItem>
            </Select>
          </FormControl>
        </div>
        {urlOption === UrlOption.CUSTOM &&
          <div className="text-input-field">
            <TextField
              required
              fullWidth
              size="dense"
              label="URL"
              variant="outlined"
              margin="none"
              onChange={(evt) => setUrl(evt.target.value)}/>
          </div>
        }
        <div className="connect-button">
          <Button
            size="large"
            variant="outlined"
            onClick={() => handleConnect(url)}>
              Connect
          </Button>
        </div>
      </div>
    </>
  )
}

export default NetworkSelectionStep;
