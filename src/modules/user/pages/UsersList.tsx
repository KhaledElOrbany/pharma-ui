import { useState } from 'react';
import { useFetchUsersQuery } from '../redux/UserAPI';
import { useTranslation } from 'react-i18next';
import { Container, Stack, Typography } from '@mui/material';
import DataGrid from '@/shared/components/data-grid';
import NewUserDialog from '../components/NewUserDialog';

export default function UsersList() {
  const { t } = useTranslation();

  const [filtersList, setFiltersList] = useState([{ key: 'size', value: 5 }]);

  const {
    data: usersList,
    isFetching,
    refetch,
  } = useFetchUsersQuery({
    filters: filtersList,
  });

  const actions = [
    {
      name: t('delete'),
      color: 'error.main',
      sx: {},
      icon: 'solar:trash-bin-minimalistic-bold',
      foo: () => {},
      isDisabled: null,
      disablingElement: '',
    },
  ];

  return (
    <Container maxWidth={'lg'}>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        mb={5}
      >
        <Typography variant='h4' gutterBottom>
          {t('usersList')}
        </Typography>

        <NewUserDialog />
      </Stack>

      <DataGrid
        actions={actions}
        filtersList={filtersList}
        isFetching={isFetching}
        module='users-list'
        pagination={usersList?.meta ?? {}}
        refetch={refetch}
        rowsPerPage={
          filtersList.find((item) => item.key === 'size')?.value || 5
        }
        setFiltersList={setFiltersList}
        data={usersList?.data}
        tableMetaData={usersList?.meta?.tableMetaData}
      />
    </Container>
  );
}
