import Nautilus from '@octopusthink/nautilus';
import { Link } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import Header from '../components/Header';

export const App = (props) => {
  const siteDescription = 'whatever';
  const { children } = props;
  return (
    <Nautilus config={{ LinkComponent: Link }}>
      <Helmet>
        <meta name="description" content={siteDescription} />
        <title>Octopus Think</title>
      </Helmet>
      <Header />
      {children}
    </Nautilus>
  );
};

export default App;
