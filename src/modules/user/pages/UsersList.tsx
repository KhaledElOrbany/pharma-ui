import { useState } from 'react';
import { useDeleteUserMutation, useFetchUsersQuery } from '../redux/UserAPI';
import { useTranslation } from 'react-i18next';
import { Container, Stack, Typography } from '@mui/material';
import DataGrid from '@/shared/components/data-grid';
import NewUserDialog from '../components/NewUserDialog';
import ConfirmationDialog from '@/shared/components/dialogs/confirmation/ConfirmationDialog';

export default function UsersList() {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filtersList, setFiltersList] = useState([{ key: 'size', value: 5 }]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const {
    data: usersList,
    isFetching,
    refetch,
  } = useFetchUsersQuery({
    filters: filtersList,
  });

  const [deleteUser] = useDeleteUserMutation();

  const actions = [
    {
      name: t('delete'),
      color: 'error.main',
      icon: 'solar:trash-bin-minimalistic-bold',
      foo: (id: number) => {
        setSelectedUserId(id);
        setIsOpen(true);
      },
    },
  ];

  const handleConfirmDelete = async () => {
    if (selectedUserId !== null) {
      await deleteUser({ id: selectedUserId });
      setIsOpen(false);
      setSelectedUserId(null);
    }
  };

  return (
    <>
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

      <ConfirmationDialog
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={handleConfirmDelete}
        title={t('deleteUser')}
        subTitle={t('deleteUserConfirmation')}
      />
    </>
  );
}
