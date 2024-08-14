import React from 'react';

type HeaderProps = {
  children?: React.ReactNode;
  divider?: boolean;
  header?: string;
  goBackButton?: boolean;
  gutterBottom?: boolean;
  refetch?: () => {};
  sx?: object;
};

export { HeaderProps };
