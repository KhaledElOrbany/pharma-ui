import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Container, Stack, Typography } from '@mui/material';
import Iconify from '@/shared/components/iconify';
import DataGrid from '@/shared/components/data-grid/DataGrid';
import { useFetchMedicinesQuery } from '../redux/MedicineAPI';

export default function MedicinesList() {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  const [filtersList, setFiltersList] = useState([{ id: 'size', value: 5 }]);

  const {
    data: medicinesList,
    isFetching,
    refetch,
  } = useFetchMedicinesQuery({
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
          {t('medicinesList')}
        </Typography>
        <Button
          variant='contained'
          endIcon={isRTL ? <Iconify icon='eva:plus-fill' /> : ''}
          startIcon={isRTL ? '' : <Iconify icon='eva:plus-fill' />}
        >
          {t('addMedicine')}
        </Button>
      </Stack>

      <DataGrid
        actions={actions}
        filtersList={filtersList}
        isFetching={isFetching}
        module='users-list'
        pagination={medicinesList?.meta ?? {}}
        refetch={refetch}
        rowsPerPage={filtersList.find((item) => item.id === 'size')?.value || 5}
        setFiltersList={setFiltersList}
        data={medicinesList?.data}
        tableMetaData={medicinesList?.meta?.tableMetaData}
      />
    </Container>
  );
}
