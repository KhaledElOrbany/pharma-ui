import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  Toolbar as MuiToolbar,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  ButtonGroup,
} from '@mui/material';
import Iconify from '../iconify';
import * as XLSX from 'xlsx';
import { useTranslation } from 'react-i18next';
import Colors from '../../../theme/Colors';
import { fDateTime } from '../../../helpers/utils/TimeUtil';

const StyledRoot = styled(MuiToolbar)(({ theme }) => ({
  height: 110,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: `0 8px 16px 0 ${alpha(Colors.grey[500], 0.16)}`,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

const StyledOptions = styled(ButtonGroup)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'end',
  padding: theme.spacing(0, 1, 0, 1),
}));

type ToolbarProps = {
  data: any[];
  filterName: string;
  module: string;
  numSelected: number;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  refresh: () => void;
  tableHeads: any[];
};

export default function Toolbar({
  data,
  filterName,
  module,
  numSelected,
  onFilterName,
  refresh,
  tableHeads,
}: ToolbarProps) {
  const { t } = useTranslation();

  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new();

    const columns = tableHeads.map((headCell) => headCell.id);
    const rows = data.map((row) => columns.map((column) => row[column]?.value));

    const headers = tableHeads.map((headCell) => headCell.label);
    const body = rows.map((row) =>
      row.map((cell) => (cell === true ? 'Yes' : cell === false ? 'No' : cell))
    );

    const ws = XLSX.utils.aoa_to_sheet([headers, ...body]);
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    XLSX.writeFile(workbook, `${module}-${fDateTime(new Date())}.xlsx`);
  };

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'primary.light' : 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component='div' variant='subtitle1'>
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <StyledSearch
            value={filterName}
            onChange={onFilterName}
            placeholder={t('search')}
            startAdornment={
              <InputAdornment position='start'>
                <Iconify
                  icon='eva:search-fill'
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
          />
          <StyledOptions>
            <Iconify
              color={'#4b553a'}
              icon={'ant-design:file-excel'}
              width={42}
              onClick={handleExportExcel}
              sx={{ cursor: 'pointer' }}
            />
            <IconButton
              title={t('refresh')}
              onClick={() => refresh()}
              sx={{
                margin: '0.5rem',
                border: '1px solid #4b553a',
                borderRadius: '8px',
                '&:hover': {
                  color: '#f7f8fa',
                  backgroundColor: '#4b553a',
                },
              }}
            >
              <Iconify icon={'material-symbols:refresh'} width={24} />
            </IconButton>
          </StyledOptions>
        </>
      )}
    </StyledRoot>
  );
}
