import { useState } from 'react';
import { useDeleteUserMutation, useFetchUsersQuery } from '../redux/UserAPI';
import { useTranslation } from 'react-i18next';
import { Box, Container, Stack, Tab, Tabs, Typography } from '@mui/material';
import DataGrid from '@/shared/components/data-grid';
import NewUserDialog from '../components/NewUserDialog';
import ConfirmationDialog from '@/shared/components/dialogs/confirmation/ConfirmationDialog';
import Iconify from '@/shared/components/iconify';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function UsersList() {
  const { t } = useTranslation();

  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filtersList, setFiltersList] = useState([
    { key: 'page', value: 0 },
    { key: 'size', value: 5 },
    { key: 'isDeleted', value: false },
  ]);
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
      disablingElement: 'isDeleted',
    },
  ];

  const handleConfirmDelete = async () => {
    if (selectedUserId !== null) {
      await deleteUser({ id: selectedUserId });
      setIsOpen(false);
      setSelectedUserId(null);
    }
  };

  const handleTabChange = (newValue: number) => {
    setValue(newValue);
    if (newValue === 0) {
      setFiltersList(
        filtersList.map((item) =>
          item.key === 'isDeleted' ? { ...item, value: false } : item
        )
      );
    } else if (newValue === 1) {
      setFiltersList(
        filtersList.map((item) =>
          item.key === 'isDeleted' ? { ...item, value: true } : item
        )
      );
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

        <Tabs
          value={value}
          onChange={(_, v) => handleTabChange(v)}
          aria-label='icon tabs example'
          centered
        >
          <Tab
            tabIndex={0}
            icon={<Iconify icon={'solar:user-bold'} width={24} />}
            label={t('all')}
            {...a11yProps('all')}
          />
          <Tab
            tabIndex={1}
            icon={<Iconify icon={'solar:user-cross-bold'} width={26} />}
            label={t('deleted')}
            {...a11yProps('deleted')}
          />
        </Tabs>

        <TabPanel value={value} key={'all'} index={0}>
          <DataGrid
            actions={actions}
            filtersList={filtersList}
            isFetching={isFetching}
            module='users-list'
            pagination={usersList?.meta ?? {}}
            refetch={refetch}
            rowsPerPage={
              (filtersList.find((item) => item.key === 'size')?.value ||
                5) as number
            }
            setFiltersList={setFiltersList}
            data={usersList?.data}
            tableMetaData={usersList?.meta?.tableMetaData}
          />
        </TabPanel>

        <TabPanel value={value} key={'deleted'} index={1}>
          <DataGrid
            actions={actions}
            filtersList={filtersList}
            isFetching={isFetching}
            module='users-list'
            pagination={usersList?.meta ?? {}}
            refetch={refetch}
            rowsPerPage={
              (filtersList.find((item) => item.key === 'size')?.value ||
                5) as number
            }
            setFiltersList={setFiltersList}
            data={usersList?.data}
            tableMetaData={usersList?.meta?.tableMetaData}
          />
        </TabPanel>
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
