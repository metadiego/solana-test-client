import { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { purple } from '@mui/material/colors';
import Button from '@mui/material/Button';

const LoadingButton = ({buttonLabel, handleClick}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: purple[100],
    }),
  };

  const handleButtonClick = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      await handleClick();
      setLoading(false);
      setSuccess(true);
      timer.current = window.setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  };

  return (
      <Box sx={{ position: 'relative' }}>
        <Button
          size="large"
          variant="outlined"
          margin="normal"
          sx={buttonSx}
          disabled={loading}
          onClick={handleButtonClick}
        >
          {buttonLabel}
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: purple[300],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
  );
}

export default LoadingButton;
