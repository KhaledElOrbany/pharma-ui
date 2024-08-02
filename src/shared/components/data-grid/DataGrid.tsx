import { filter } from 'lodash';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Iconify from '../iconify/Iconify';
import Label from '../label';
import Scrollbar from '../scrollbar';
import {
  Card,
  Table,
  Paper,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  Popover,
  MenuItem,
  IconButton,
  Skeleton,
  Stack,
  Chip,
  Tooltip,
  useTheme,
} from '@mui/material';
import Head from './Head';
import Toolbar from './Toolbar';
import { useTranslation } from 'react-i18next';
import Footer from './Footer';
import MediaCard from '../media-card/MediaCard';
import { fDateTime } from '../../../helpers/utils/TimeUtil';
import { DataGridProps } from './DataGrid.d';

function descendingComparator(a: any, b: any, orderBy: any) {
  if (b[orderBy].value < a[orderBy].value) {
    return -1;
  }
  if (b[orderBy].value > a[orderBy].value) {
    return 1;
  }
  return 0;
}

function getComparator(order: any, orderBy: any) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(
  array: any,
  fields: any,
  orderBy: any,
  comparator: any,
  query: any
) {
  const stabilizedThis = array.map((el: any, index: any) => [el, index]);
  stabilizedThis.sort((a: any, b: any) => {
    const order = orderBy === '' ? 0 : comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(array, (row) => {
      for (const { id: field } of fields) {
        const value = row[field]?.value;
        if (
          value &&
          typeof value === 'string' &&
          value.toLowerCase().indexOf(query.toLowerCase()) !== -1
        ) {
          return true;
        }
      }
      return false;
    });
  }

  return stabilizedThis.map((el: any) => el[0]);
}

export default function DataGrid({
  actions,
  filtersList = [],
  isFetching,
  module = '',
  pagination = {},
  processedData,
  refetch,
  rowsPerPage,
  setFiltersList,
  tableHeads,
}: DataGridProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<any[]>([]);
  const [orderBy, setOrderBy] = useState('');
  const [filterName, setFilterName] = useState('');
  const [selectedRow, setSelectedRow] = useState(0);
  const isRTL = localStorage.getItem('language') === 'ar';

  const handleOpenMenu = (event: any, id: any) => {
    setOpen(event.currentTarget);
    setSelectedRow(id);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const checkIsDisabled = (id: any, disablingElement: any) => {
    const selectedRecord = processedData.find(
      (record: any) => record.id.value === id
    );
    return selectedRecord ? selectedRecord[disablingElement]?.value : false;
  };

  const handleRequestSort = (property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = (processedData || [])?.map((n: any) => n.id.value);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (name: any) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: any[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (newPage: any) => {
    const newFilters = [...filtersList];
    const index = newFilters.findIndex((item) => item.id === 'page');

    if (index > -1) {
      newFilters.splice(index, 1);
    }

    newFilters.push({
      id: 'page',
      value: newPage + 1,
    });
    setFiltersList(newFilters);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPage(0);
    const newFilters = [...filtersList];
    const index = newFilters.findIndex((item) => item.id === 'per_page');

    if (index > -1) {
      newFilters.splice(index, 1);
    }

    newFilters.push({
      id: 'per_page',
      value: parseInt(event.target.value, 10),
    });
    setFiltersList(newFilters);
  };

  const handleFilterByName = (event: any) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleRemoveFilter = (id: any) => {
    const newFilters = filtersList.filter((filter) => filter.id !== id);
    setFiltersList(newFilters);
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - (processedData || [])?.length)
      : 0;

  const filteredData = applySortFilter(
    processedData || [],
    tableHeads,
    orderBy,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredData.length && !!filterName;

  return (
    <>
      <Card>
        <Toolbar
          data={filteredData}
          filterName={filterName}
          module={module}
          numSelected={selected.length}
          onFilterName={handleFilterByName}
          refresh={() => refetch()}
          tableHeads={tableHeads}
        />

        {filtersList && (
          <Stack
            direction='row'
            spacing={1}
            sx={{
              padding: theme.spacing(0, 1, 1, 3),
            }}
          >
            {filtersList
              .filter((filter) => filter.label)
              .map(({ id, label, value, valueLabel }) => (
                <Chip
                  key={id}
                  dir={'ltr'}
                  label={`${label}: ${valueLabel ?? value}`}
                  onDelete={() => handleRemoveFilter(id)}
                />
              ))}
          </Stack>
        )}

        <Scrollbar>
          <TableContainer>
            <Table>
              <Head
                filtersList={filtersList}
                headLabel={tableHeads}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
                order={order}
                orderBy={orderBy}
                rowCount={(processedData || [])?.length}
                setFiltersList={setFiltersList}
              />
              <TableBody>
                {isFetching ? (
                  <TableRow>
                    <TableCell padding='checkbox'>
                      <Checkbox disabled />
                    </TableCell>
                    {tableHeads.map((head) => (
                      <TableCell key={head.id}>
                        <Skeleton
                          variant='rounded'
                          animation='pulse'
                          width='100%'
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ) : (
                  filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                      const id = row.id.value;
                      const selectedRecord = selected.indexOf(id) !== -1;

                      const keys = Object.keys(filteredData[0] || {}).filter(
                        (key) => key !== 'id'
                      );
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role='checkbox'
                          selected={selectedRecord}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox
                              checked={selectedRecord}
                              onChange={() => handleClick(id)}
                            />
                          </TableCell>

                          {keys.map((key) => (
                            <TableCell
                              key={key}
                              component='th'
                              scope='row'
                              padding='normal'
                              align={isRTL ? 'right' : 'left'}
                            >
                              {row[key].type === 'boolean' ? (
                                <Label
                                  color={
                                    (row[key].value === false && 'error') ||
                                    'success'
                                  }
                                >
                                  {row[key].value ? (
                                    <span className='tick-icon'>&#x2714;</span>
                                  ) : (
                                    <span className='cross-icon'>&#x2718;</span>
                                  )}
                                </Label>
                              ) : row[key].type === 'money' ? (
                                `${row[key].value} ${isRTL ? 'ج.م.' : 'EGP'}`
                              ) : row[key].type === 'date' ? (
                                fDateTime(row[key].value)
                              ) : row[key].type === 'img' ? (
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'start',
                                    alignItems: 'center',
                                  }}
                                >
                                  <MediaCard
                                    withZoom
                                    alt={`img-${id}`}
                                    src={row[key].value}
                                  />
                                </div>
                              ) : row[key].link ? (
                                <Tooltip title={row[key].value}>
                                  <Typography variant='subtitle2' noWrap>
                                    <Link
                                      style={{
                                        color: theme.palette.primary.main,
                                      }}
                                      to={row[key].linkTo}
                                    >
                                      {typeof row[key].value === 'string'
                                        ? row[key].value.length <= 22
                                          ? row[key].value
                                          : row[key].value.slice(0, 22) + '...'
                                        : row[key].value}
                                    </Link>
                                  </Typography>
                                </Tooltip>
                              ) : (
                                <Tooltip title={row[key].value}>
                                  <Typography noWrap variant='subtitle2'>
                                    {typeof row[key].value === 'string'
                                      ? row[key].value.length <= 22
                                        ? row[key].value
                                        : row[key].value.slice(0, 22) + '...'
                                      : row[key].value}
                                  </Typography>
                                </Tooltip>
                              )}
                            </TableCell>
                          ))}

                          {actions.length > 0 && (
                            <TableCell align={isRTL ? 'left' : 'right'}>
                              <IconButton
                                size='large'
                                color='inherit'
                                aria-label={`more-${id}`}
                                onClick={(event) => handleOpenMenu(event, id)}
                              >
                                <Iconify icon={'eva:more-vertical-fill'} />
                              </IconButton>
                            </TableCell>
                          )}
                        </TableRow>
                      );
                    })
                )}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>

              {isNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align='center' colSpan={12} sx={{ py: 3 }}>
                      <Paper
                        sx={{
                          textAlign: 'center',
                        }}
                      >
                        <Typography variant='h6' paragraph>
                          {t('notFound')}
                        </Typography>
                        <Typography variant='body2'>
                          {t('noResultsFoundFor')} &nbsp;
                          <strong>&quot;{filterName}&quot;</strong>
                          <br />
                          <br /> {t('checkSpelling')}
                        </Typography>
                      </Paper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Scrollbar>

        <Footer
          t={t}
          page={page}
          pagination={pagination}
          rowsPerPage={rowsPerPage}
          processedData={processedData}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Card>

      {actions.length > 0 && (
        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              p: 1,
              '& .MuiMenuItem-root': {
                px: 1,
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          {actions.map((action) => (
            <MenuItem
              key={action.name}
              sx={{ ...action.sx, color: action.color }}
              disabled={
                checkIsDisabled(selectedRow, action.disablingElement) ||
                action.isDisabled
              }
              onClick={() => {
                handleCloseMenu();
                action.foo(selectedRow);
              }}
            >
              <Iconify
                icon={action.icon}
                sx={{
                  color: action.color,
                  ...(isRTL ? { ml: 2 } : { mr: 2 }),
                }}
              />
              {action.name}
            </MenuItem>
          ))}
        </Popover>
      )}
    </>
  );
}
