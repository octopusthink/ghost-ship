import { PageTitle } from '@octopusthink/nautilus';
import React from 'react';
import Helmet from 'react-helmet';

import App from './app';

export const NotFound = (props) => {
  return (
    <App>
      <Helmet>
        <title>Blog Posts</title>
      </Helmet>
      <PageTitle>Oh no! Not found!</PageTitle>
    </App>
  );
};

export default NotFound;
