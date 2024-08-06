import { useFetchDoctorClasssQuery } from '../redux/DoctorClassAPI';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '@/shared/components/iconify';
import DataGrid from '@/shared/components/data-grid/DataGrid';

export default function DoctorClassesList() {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  const [filtersList, setFiltersList] = useState([{ id: 'size', value: 5 }]);

  const {
    data: DoctorClassesList,
    isFetching,
    refetch,
  } = useFetchDoctorClasssQuery({
    filters: filtersList,
  });

  const tableHeaders = [
    { id: 'name', label: t('name') },
    { id: 'visitCount', label: t('visitCount') },
    { id: 'notes', label: t('notes') },
    { id: 'isActive', label: t('isActive') },
    { id: 'isDeleted', label: t('isDeleted') },
  ];

  const processedData: Object[] = [];
  if (!isFetching) {
    (DoctorClassesList?.data || []).forEach((row) => {
      processedData.push({
        id: {
          value: row.id,
          type: 'number',
          link: false,
          linkTo: '',
        },
        name: {
          value: row.name,
          type: 'string',
          link: true,
          linkTo: `/doctorClass/${row.id}`,
        },
        visitCount: {
          value: row.visitCount,
          type: 'number',
          link: false,
          linkTo: '',
        },
        isActive: {
          value: row.isActive,
          type: 'boolean',
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
          {t('doctorClassesList')}
        </Typography>
        <Button
          variant='contained'
          endIcon={isRTL ? <Iconify icon='eva:plus-fill' /> : ''}
          startIcon={isRTL ? '' : <Iconify icon='eva:plus-fill' />}
        >
          {t('addDoctorClass')}
        </Button>
      </Stack>

      <DataGrid
        actions={actions}
        filtersList={filtersList}
        isFetching={isFetching}
        module='users-list'
        pagination={DoctorClassesList?.meta ?? {}}
        refetch={refetch}
        rowsPerPage={filtersList.find((item) => item.id === 'size')?.value || 5}
        setFiltersList={setFiltersList}
        tableHeaders={tableHeaders}
      />
    </Container>
  );
}
