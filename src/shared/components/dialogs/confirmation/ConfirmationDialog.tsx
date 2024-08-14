import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '@/shared/components/iconify';
import { ConfirmationDialogProps } from './ConfirmationDialog.d';

export default function ConfirmationDialog({
  isLoading = false,
  isOpen,
  onCancel,
  onConfirm,
  subTitle = '',
  sx = {},
  title = '',
}: ConfirmationDialogProps) {
  const isRTL = localStorage.getItem('language') === 'ar';

  return (
    <Dialog open={isOpen} sx={sx}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <Typography
          variant='h6'
          component='div'
          sx={{
            display: 'flex',
            alignItems: 'center',
            pb: 1,
          }}
        >
          <Iconify
            icon={'octicon:info-24'}
            sx={{
              mr: isRTL ? 0 : 1,
              ml: isRTL ? 1 : 0,
            }}
          />
          {title}
        </Typography>
        <Typography variant='subtitle2'>{subTitle}</Typography>
      </DialogContent>

      <Divider sx={{ marginLeft: 'auto', marginRight: 'auto', width: '92%' }} />

      <DialogActions>
        <Button variant='text' color='error' onClick={onCancel} sx={{ mx: 1 }}>
          {isRTL ? 'لا' : 'No'}
        </Button>
        <LoadingButton
          color='primary'
          loading={isLoading}
          onClick={onConfirm}
          variant='text'
        >
          {isRTL ? 'نعم' : 'Yes'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
