import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router';

export default function ReservationCountdown() {
  const [progress, setProgress] = React.useState(0);
  const navigator = useNavigate()
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          navigator('/')
          return 0;
        }
        return Math.min(oldProgress + 1, 1000);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, [navigator]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 5,
          backgroundColor: '#424242',
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'red',
          },
        }}
      />
    </Box>
  );
}
