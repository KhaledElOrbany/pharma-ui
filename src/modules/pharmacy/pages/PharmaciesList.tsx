import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '@/shared/components/iconify';
import DataGrid from '@/shared/components/data-grid/DataGrid';
import { useFetchPharmacysQuery } from '../redux/PharmacyAPI';

export default function PharmacyList() {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  const [filtersList, setFiltersList] = useState([{ id: 'size', value: 5 }]);

  const {
    data: pharmaciesList,
    isFetching,
    refetch,
  } = useFetchPharmacysQuery({
    filters: filtersList,
  });

  const tableHeads = [
    { id: 'name', label: t('name') },
    { id: 'visitCount', label: t('visitCount') },
    { id: 'notes', label: t('notes') },
    { id: 'isActive', label: t('isActive') },
    { id: 'isDeleted', label: t('isDeleted') },
    { id: 'actions' },
  ];

  const processedData: Object[] = [];
  if (!isFetching) {
    (pharmaciesList?.data || []).forEach((row) => {
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
          {t('newDoctorClass')}
        </Button>
      </Stack>

      <DataGrid
        actions={actions}
        filtersList={filtersList}
        isFetching={isFetching}
        module='users-list'
        pagination={pharmaciesList?.meta ?? {}}
        processedData={processedData}
        refetch={refetch}
        rowsPerPage={filtersList.find((item) => item.id === 'size')?.value || 5}
        setFiltersList={setFiltersList}
        tableHeads={tableHeads}
      />
    </Container>
  );
}
