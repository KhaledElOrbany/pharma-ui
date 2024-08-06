import { Container, Grid, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useFetchUserQuery } from '../redux/UserAPI';
import Header from '@/shared/components/header';
import Loader from '@/shared/components/loader';
import UserSummary from '../components/UserSummary';
import UserDetails from '../components/UserDetails';

type params = {
  id: string;
};

export default function UserProfile() {
  const { id } = useParams<params>();
  const numericId = id ? parseInt(id, 10) : NaN;

  if (isNaN(numericId)) {
    throw new Error('Parameter is not a number!');
  }

  const { data: user, isFetching, refetch } = useFetchUserQuery(numericId);

  return isFetching ? (
    <Loader />
  ) : (
    <Container maxWidth='lg'>
      <Stack spacing={3}>
        <Header header='user.profile' refetch={refetch} divider />

        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <UserSummary data={user} />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
              <UserDetails data={user} />
            </Grid>
          </Grid>
        </div>
      </Stack>
    </Container>
  );
}
