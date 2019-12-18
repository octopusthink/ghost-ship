import { PageTitle } from '@octopusthink/nautilus';
import React from 'react';

const PageHeader = (props) => {
  const { children } = props;

  return (
    <header>
      <PageTitle>{children}</PageTitle>
    </header>
  );
};

export default PageHeader;
