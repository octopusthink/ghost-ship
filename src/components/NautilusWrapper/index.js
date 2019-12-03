import React from 'react';
import Nautilus from '@octopusthink/nautilus';
import { Link } from 'gatsby';

import config from 'data/SiteConfig';

const NautilusWrapper = (props) => {
  const { children } = props;

  return (
    <Nautilus
      config={{ LinkComponent: Link }}
      theme={config.nautilusTheme ? config.nautilusTheme : undefined}
    >
      {children}
    </Nautilus>
  );
};

export default NautilusWrapper;
