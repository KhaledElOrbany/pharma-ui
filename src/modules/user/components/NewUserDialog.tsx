import { useState } from 'react';
import PromptDialog from '@/shared/components/dialogs/prompt/PromptDialog';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Iconify from '@/shared/components/iconify';

export default function NewUserDialog() {
  const { t } = useTranslation();
  const isRTL = localStorage.getItem('language') === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState({
    isOpen,
    title: '',
    onSave: () => {
      setIsOpen(false);
    },
  });

  return (
    <>
      <Button
        variant='contained'
        endIcon={isRTL ? <Iconify icon='eva:plus-fill' /> : ''}
        startIcon={isRTL ? '' : <Iconify icon='eva:plus-fill' />}
        onClick={() =>
          setDialogData({
            ...dialogData,
            isOpen: true,
            title: t('addUser'),
          })
        }
      >
        {t('addUser')}
      </Button>

      <PromptDialog
        confirmBtnText='add'
        dialogData={dialogData}
        setDialogData={setDialogData}
      >
        <div>Form</div>
      </PromptDialog>
    </>
  );
}
