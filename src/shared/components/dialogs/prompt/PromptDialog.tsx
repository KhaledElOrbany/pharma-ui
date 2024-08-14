import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { PromptDialogProps } from './PromptDialog.d';

export default function PromptDialog({
  children,
  confirmBtnText,
  isLoading = false,
  isOpen,
  onCancel,
  onSave,
  sx = {},
  title = '',
}: PromptDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} sx={sx}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ pt: '.5rem !important' }}>{children}</DialogContent>

      <Divider sx={{ marginLeft: 'auto', marginRight: 'auto', width: '92%' }} />

      <DialogActions>
        <Button
          variant='contained'
          color='error'
          sx={{ mx: 1 }}
          onClick={onCancel}
        >
          {t('cancel')}
        </Button>

        <LoadingButton
          color='primary'
          variant='contained'
          loading={isLoading}
          onClick={onSave}
        >
          {confirmBtnText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
