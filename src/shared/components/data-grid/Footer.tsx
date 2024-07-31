import React from 'react';
import { TablePagination } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type FooterProps = {
  t: any;
  page: number;
  pagination: any;
  rowsPerPage: number;
  processedData: any;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Footer({
  t,
  page,
  pagination,
  rowsPerPage,
  processedData,
  handleChangePage,
  handleChangeRowsPerPage,
}: FooterProps) {
  const theme = useTheme();

  return (
    <TablePagination
      component='div'
      count={pagination.total ?? (processedData || [])?.length}
      dir={'ltr'}
      labelRowsPerPage={t('rowsPerPage')}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      page={pagination.current_page ? pagination.current_page - 1 : page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
      showFirstButton
      showLastButton
      sx={{
        mx: 2,
        [theme.breakpoints.down('sm')]: {
          '& .MuiTablePagination-toolbar': {
            padding: 0,
            flexFlow: 'wrap',
            justifyContent: 'center',
          },
        },
      }}
    />
  );
}
