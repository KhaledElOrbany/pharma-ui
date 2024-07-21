import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import {
  Container,
  Typography,
  Divider,
  CardContent,
  CardHeader,
  Card,
} from '@mui/material';
import LoginForm from '../components/LoginForm';
import { useTranslation } from 'react-i18next';
import Colors from '../../../theme/Colors';
import Logo from '../../../shared/components/logo';

const StyledRoot = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledHeader = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

export default function Login() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <StyledRoot>
        <StyledHeader>
          <Logo />
        </StyledHeader>

        <Container maxWidth='sm'>
          <StyledContent>
            <Card sx={{ backgroundColor: Colors.offWhite }}>
              <CardHeader
                title={
                  <Typography align='center' variant='h4' gutterBottom>
                    {t('hi')}
                  </Typography>
                }
                subheader={
                  <Typography align='center' variant='h5' gutterBottom>
                    {t('welcome')}
                  </Typography>
                }
              />

              <Divider
                sx={{
                  my: 2,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '90%',
                }}
              />

              <CardContent sx={{ pt: 2 }}>
                <LoginForm />
              </CardContent>
            </Card>
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
