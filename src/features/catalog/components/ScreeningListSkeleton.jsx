import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function ScreeningListSkeleton() {
  return (
    <Box sx={{ width: "100%" }}>
      <Skeleton height={70} sx={{mb:0 , backgroundColor: '#888'}} animation="wave" />
      <Skeleton height={70} sx={{mb:0 , backgroundColor: '#888' }} animation="wave" />
    </Box>
  );
}
