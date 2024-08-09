import PromptDialog from '@/shared/components/dialogs/prompt/PromptDialog';
import { useEffect, useState } from 'react';

type NewUserDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function NewUserDialog({ open, setOpen }: NewUserDialogProps) {
  const [dialogData, setDialogData] = useState({
    isOpen: false,
    title: 'Add New User',
    onSave: () => setOpen(false),
  });

  useEffect(() => {
    setDialogData({ ...dialogData, isOpen: open });
  }, [open]);

  return (
    <PromptDialog
      confirmBtnText='add'
      dialogData={dialogData}
      setDialogData={setDialogData}
    >
      <div>Form</div>
    </PromptDialog>
  );
}
