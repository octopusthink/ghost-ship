/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const outputIfSet = (valueToCheck, objectToOutput) => {
  if (!valueToCheck) {
    return {};
  }

  return { ...objectToOutput };
};

function SEO(props) {
  const {
    article,
    canonical,
    description,
    homepage,
    image,
    lang,
    meta,
    modifiedTime,
    pathname,
    publishedTime,
    tags,
    title,
  } = props;
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            defaultImage
            description
            language
            siteUrl
            title
          }
        }
      }
    `,
  );

  // Inverse the order of site & page titles on homepage only.
  // TODO: Try to use Helmet's titleTemplate and/or automatic detection.
  let pageDisplayTitle = `${title} · ${site.siteMetadata.title}`;
  if (homepage) {
    pageDisplayTitle = `${site.siteMetadata.title} · ${title}`;
  }

  const seo = {
    description: description || site.siteMetadata.description,
    lang: lang || site.siteMetadata.language,
    image: `${site.siteMetadata.siteUrl}${image || site.siteMetadata.defaultImage}`,
    modifiedTime,
    publishedTime,
    siteName: site.siteMetadata.title,
    tags,
    title,
    type: article ? `article` : `website`,
    url: canonical || `${site.siteMetadata.siteUrl}${pathname || '/'}`,
  };

  return (
    <Helmet
      htmlAttributes={{
        lang: seo.lang,
      }}
      meta={[
        {
          name: `description`,
          content: seo.description,
        },
        {
          property: `og:site_name`,
          content: seo.siteName,
        },
        {
          property: `og:title`,
          content: seo.title,
        },
        {
          property: `og:description`,
          content: seo.description,
        },
        {
          property: `og:type`,
          content: seo.type,
        },
        {
          property: `og:url`,
          content: seo.url,
        },
        {
          property: `og:locale`,
          content: seo.lang,
        },
        {
          property: `og:image`,
          content: seo.image,
        },
        outputIfSet(article && seo.publishedTime, {
          property: `article:published_time`,
          content: seo.publishedTime,
        }),
        outputIfSet(article && seo.modifiedTime, {
          property: `article:modified_time`,
          content: seo.modifiedTime,
        }),
        outputIfSet(article && seo.tags, {
          property: `article:tags`,
          content: seo.tags,
        }),
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: seo.title,
        },
        {
          name: `twitter:description`,
          content: seo.description,
        },
        {
          name: `twitter:image`,
          content: seo.image,
        },
      ].concat(meta)}
    >
      <title>{pageDisplayTitle}</title>
      <link rel="canonical" href={seo.url} />
    </Helmet>
  );
}

SEO.defaultProps = {
  // If this prop is `undefined`, `siteConfig.language` will be used as a fallback.
  lang: undefined,
  meta: [],
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
};

export default SEO;
