import React from 'react';

type ConfirmationDialogProps = {
  isLoading?: boolean;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  subTitle?: string;
  sx?: React.CSSProperties;
  title: string;
};

export { ConfirmationDialogProps };
