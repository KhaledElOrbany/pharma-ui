import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

type PromptDialogProps = {
  children: React.ReactNode;
  confirmBtnText?: string;
  dialogData: {
    isOpen: boolean;
    title: string;
    onSave: () => void;
  };
  isLoading?: boolean;
  setDialogData: (data: {
    isOpen: boolean;
    title: string;
    onSave: () => void;
  }) => void;
  sx?: object;
};

export default function PromptDialog({
  children,
  confirmBtnText,
  dialogData,
  isLoading = false,
  setDialogData,
  sx = {},
}: PromptDialogProps) {
  const { t } = useTranslation();

  return (
    <Dialog open={dialogData.isOpen} sx={sx}>
      <DialogTitle>{dialogData.title}</DialogTitle>
      <DialogContent>{children}</DialogContent>

      <Divider sx={{ marginLeft: 'auto', marginRight: 'auto', width: '92%' }} />

      <DialogActions>
        <Button
          variant='contained'
          color='error'
          onClick={() =>
            setDialogData({
              ...dialogData,
              isOpen: false,
            })
          }
          sx={{ mx: 1 }}
        >
          {t('cancel')}
        </Button>
        <LoadingButton
          color='primary'
          variant='contained'
          loading={isLoading}
          onClick={dialogData.onSave}
        >
          {confirmBtnText ? t(confirmBtnText) : t('save')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
