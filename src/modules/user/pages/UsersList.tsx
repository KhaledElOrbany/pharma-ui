import { useState } from 'react';
import { useFetchUsersQuery } from '../redux/UserAPI';
import { useTranslation } from 'react-i18next';
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '@/shared/components/iconify';
import DataGrid from '@/shared/components/data-grid';

export default function UsersList() {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  const [filtersList, setFiltersList] = useState([{ id: 'size', value: 5 }]);

  const {
    data: usersList,
    isFetching,
    refetch,
  } = useFetchUsersQuery({
    filters: filtersList,
  });

  const tableHeads = [
    { id: 'name', label: t('name') },
    { id: 'phone', label: t('phone') },
    { id: 'address', label: t('address') },
    { id: 'city', label: t('city') },
    { id: 'email', label: t('email') },
    { id: 'role', label: t('role') },
    { id: 'isDeleted', label: t('isDeleted') },
  ];

  const processedData: Object[] = [];
  if (!isFetching) {
    (usersList?.data || []).forEach((row) => {
      processedData.push({
        id: {
          value: row.id,
          type: 'number',
          link: false,
          linkTo: '',
        },
        name: {
          value: `${row.firstName} ${row.lastName}`,
          type: 'string',
          link: true,
          linkTo: `/users/${row.id}`,
        },
        phone: {
          value: row.phone,
          type: 'string',
          link: false,
          linkTo: '',
        },
        address: {
          value: row.address,
          type: 'string',
          link: false,
          linkTo: '',
        },
        city: {
          value: isRTL ? row.city.nameAr : row.city.nameEn,
          type: 'string',
          link: false,
          linkTo: '',
        },
        email: {
          value: row.email,
          type: 'string',
          link: false,
          linkTo: '',
        },
        role: {
          value: row.role.name,
          type: 'string',
          link: false,
          linkTo: '',
        },
        isDeleted: {
          value: row.isDeleted,
          type: 'boolean',
          link: false,
          linkTo: '',
        },
      });
    });
  }

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
        <Button
          variant='contained'
          endIcon={isRTL ? <Iconify icon='eva:plus-fill' /> : ''}
          startIcon={isRTL ? '' : <Iconify icon='eva:plus-fill' />}
        >
          {t('addUser')}
        </Button>
      </Stack>

      <DataGrid
        actions={actions}
        filtersList={filtersList}
        isFetching={isFetching}
        module='users-list'
        pagination={usersList?.meta ?? {}}
        processedData={processedData}
        refetch={refetch}
        rowsPerPage={filtersList.find((item) => item.id === 'size')?.value || 5}
        setFiltersList={setFiltersList}
        tableHeads={tableHeads}
      />
    </Container>
  );
}
