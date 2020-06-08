import { css } from '@emotion/core';
import { Paragraph } from '@octopusthink/nautilus';
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const { site } = useStaticQuery(graphql`
  query {
    site {
      siteMetadata {
        copyright
      }
    }
  }
`);

import config from 'data/SiteConfig';

const SiteFooter = () => {
  return (
    <footer
      css={css`
        border-top: 2px solid;
        margin-top: 4.8rem;
        margin: 0 auto;
        max-width: ${config.contentWidth};
        max-width: ${config.siteContentWidth};
        padding: 2.4rem 0;
        text-align: center;
      `}
    >
      <Paragraph small light>
        {config.copyright}
      </Paragraph>
    </footer>
  );
};

export default SiteFooter;
