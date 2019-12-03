import { css, Global } from '@emotion/core';
import React from 'react';
import 'typeface-inter';

import GhostShipMDX from 'components/GhostShipMDX';
import SiteHeader from 'components/SiteHeader';
import SiteFooter from 'components/SiteFooter';

export const App = (props) => {
  const { children } = props;

  return (
    <GhostShipMDX>
      <Global
        styles={css`
          /* Place any global CSS styles here. */
          body {
          }
        `}
      />
      <SiteHeader />
      <main id="content">{children}</main>
      <SiteFooter />
    </GhostShipMDX>
  );
};

export default App;
