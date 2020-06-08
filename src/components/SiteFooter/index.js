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

const SiteFooter = () => {
  return <footer>{site.siteMetadata.copyright}</footer>;
};

export default SiteFooter;
