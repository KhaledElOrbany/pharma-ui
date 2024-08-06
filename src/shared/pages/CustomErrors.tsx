import { Helmet } from 'react-helmet-async';
import { Link as RouterLink, useRouteError } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Button, Typography, Box } from '@mui/material';

const StyledContent = styled('div')(({ theme }) => ({
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  padding: theme.spacing(12, 0),
  backgroundColor: theme.palette.background.default,
}));

export default function CustomErrors() {
  const error = useRouteError();

  return (
    <>
      <Helmet>
        <title>Oops!</title>
      </Helmet>

      <StyledContent>
        <Typography variant='h3' paragraph>
          {(error as Error)?.message ||
            (error as { statusText?: string })?.statusText}
        </Typography>

        <Box
          component='img'
          src='/assets/illustrations/error.svg'
          sx={{ height: 400, mx: 'auto', my: { xs: 5, sm: 10 } }}
        />

        <Button to='/' size='large' variant='contained' component={RouterLink}>
          Go to Home
        </Button>
      </StyledContent>
    </>
  );
}
