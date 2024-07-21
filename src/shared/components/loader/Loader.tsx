import { CircularProgress, styled } from '@mui/material';

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  padding: theme.spacing(12, 3),
  backgroundColor: theme.palette.background.default,
}));

export default function Loader() {
  return (
    <StyledContainer>
      <CircularProgress size={40} color='primary' />
    </StyledContainer>
  );
}
