import { Avatar, Box, Card, CardContent, Typography } from '@mui/material';
import { UserProps } from '../types/User';

export default function UserSummary({ data }: { data: UserProps | undefined }) {
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Avatar
            src={''}
            sx={{
              mb: 2,
              width: 80,
              height: 80,
            }}
          />
          <Typography
            gutterBottom
            variant='h5'
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            {data?.fullName}
          </Typography>
          <Typography color='text.secondary' variant='body2'>
            {data?.role}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
