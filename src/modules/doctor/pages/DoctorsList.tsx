import { useFetchDoctorsQuery } from '../redux/DoctorAPI';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '@/shared/components/iconify';
import DataGrid from '@/shared/components/data-grid/DataGrid';

export default function DoctorsList() {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  const [filtersList, setFiltersList] = useState([{ id: 'size', value: 5 }]);

  const {
    data: doctorsList,
    isFetching,
    refetch,
  } = useFetchDoctorsQuery({
    filters: filtersList,
  });

  const tableHeads = [
    { id: 'name', label: t('name') },
    { id: 'phone', label: t('phone') },
    { id: 'clinicPhone', label: t('clinicPhone') },
    { id: 'address', label: t('address') },
    { id: 'doctorClass', label: t('doctorClass') },
    { id: 'isDeleted', label: t('isDeleted') },
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
        clinicPhone: {
          value: row.clinicPhone,
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
        doctorClass: {
          value: row.doctorClass,
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
          {t('doctorsList')}
        </Typography>
        <Button
          variant='contained'
          endIcon={isRTL ? <Iconify icon='eva:plus-fill' /> : ''}
          startIcon={isRTL ? '' : <Iconify icon='eva:plus-fill' />}
        >
          {t('addDoctor')}
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
        rowsPerPage={filtersList.find((item) => item.id === 'size')?.value || 5}
        setFiltersList={setFiltersList}
        tableHeads={tableHeads}
      />
    </Container>
  );
}
