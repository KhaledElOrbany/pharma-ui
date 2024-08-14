import React from 'react';

type PromptDialogProps = {
  children: React.ReactNode;
  confirmBtnText: string;
  isLoading?: boolean;
  isOpen: boolean;
  onCancel: () => void;
  onSave: () => void;
  sx?: React.CSSProperties;
  title: string;
};

export { PromptDialogProps };
