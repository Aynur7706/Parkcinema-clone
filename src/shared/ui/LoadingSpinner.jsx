import { t, useLanguage } from '../i18n/language.js';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingSpinner() {
  useLanguage();
  return (
    <Box role="status" aria-label={t("Məlumatlar yüklənir")} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
      <CircularProgress
        variant="indeterminate"
        sx={{
          color: 'red',
          '& circle': {
            strokeDasharray: '4',
          },
        }}
      />
    </Box>
  );
}
