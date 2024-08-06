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
    data: doctorClassesList,
    isFetching,
    refetch,
  } = useFetchDoctorClasssQuery({
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
        pagination={doctorClassesList?.meta ?? {}}
        refetch={refetch}
        rowsPerPage={filtersList.find((item) => item.id === 'size')?.value || 5}
        setFiltersList={setFiltersList}
        data={doctorClassesList?.data}
        tableMetaData={doctorClassesList?.meta?.tableMetaData}
      />
    </Container>
  );
}
