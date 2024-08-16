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

  const actions = [
    {
      name: t('delete'),
      color: 'error.main',
      icon: 'solar:trash-bin-minimalistic-bold',
      foo: () => {},
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
          {t('addPharmacy')}
        </Button>
      </Stack>

      <DataGrid
        actions={actions}
        filtersList={filtersList}
        isFetching={isFetching}
        module='users-list'
        pagination={pharmaciesList?.meta ?? {}}
        refetch={refetch}
        rowsPerPage={filtersList.find((item) => item.id === 'size')?.value || 5}
        setFiltersList={setFiltersList}
        data={pharmaciesList?.data}
        tableMetaData={pharmaciesList?.meta?.tableMetaData}
      />
    </Container>
  );
}
