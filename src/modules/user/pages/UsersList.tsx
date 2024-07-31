import { useState } from 'react';
import { useFetchUsersQuery } from '../redux/UserAPI';
import { useTranslation } from 'react-i18next';
import { Button, Stack, Typography } from '@mui/material';
import Iconify from '../../../shared/components/iconify';
import { DataGrid } from '../../../shared/components/data-grid';

export default function UsersList() {
  const { t } = useTranslation();
  const isRTL = document.documentElement.dir === 'rtl';

  const [filtersList, setFiltersList] = useState([
    { id: 'per_page', value: 5 },
  ]);

  const { data: doctorsList, isFetching, refetch } = useFetchUsersQuery({});

  const tableHeads = [
    { id: 'name', label: t('name') },
    { id: 'phone', label: t('phone') },
    { id: 'address', label: t('address') },
    { id: 'email', label: t('email') },
    { id: 'role', label: t('role') },
    { id: 'isDelete', label: t('isDelete') },
    { id: 'actions' },
  ];

  const processedData: Object[] = [];
  if (!isFetching) {
    (doctorsList?.data || []).forEach((row) => {
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
        isDelete: {
          value: row.isDelete,
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
      sx: { color: 'error.main' },
      icon: 'solar:trash-bin-minimalistic-bold',
      foo: () => {},
      isDisabled: null,
      disablingElement: '',
    },
  ];

  return (
    <>
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
          disabled
          variant='contained'
          endIcon={isRTL ? <Iconify icon='eva:plus-fill' /> : ''}
          startIcon={isRTL ? '' : <Iconify icon='eva:plus-fill' />}
        >
          {t('newUser')}
        </Button>
      </Stack>

      <DataGrid
        actions={actions}
        filtersList={filtersList}
        isFetching={isFetching}
        module='users-list'
        pagination={doctorsList?.meta ?? {}}
        processedData={processedData}
        refetch={refetch}
        rowsPerPage={
          filtersList.find((item) => item.id === 'per_page')?.value || 5
        }
        setFiltersList={setFiltersList}
        tableHeads={tableHeads}
      />
    </>
  );
}
