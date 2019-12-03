import React from 'react';

const PageWrapper = (props) => {
  const { children } = props;
  return <article>{children}</article>;
};

export default PageWrapper;
