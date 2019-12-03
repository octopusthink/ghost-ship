import { graphql } from 'gatsby';
import React, { Fragment } from 'react';

import Divider from 'components/Divider';
import GridLayout from 'components/GridLayout';
import PageHeader from 'components/PageHeader';
import PageWrapper from 'components/PageWrapper';
import PortfolioCard from 'components/PortfolioCard';
import SEO from 'components/SEO';
import Statistic from 'components/Statistic';
import App from 'templates/App';

export const PortfolioList = (props) => {
  const { data } = props;
  const { page, portfolioItems } = data;

  const { metaDescription, summary: pageSummary, title: pageTitle } = page.fields;

  return (
    <App>
      <SEO title={pageTitle} description={metaDescription} />
      <PageWrapper>
        <PageHeader pageTitle={pageTitle} summary={pageSummary} />

        <GridLayout columns="3">
          <Statistic number="28" label="Years experience" />
          <Statistic number="100+" label="Projects shipped" />
          <Statistic number="958" label="Diet Cokes consumed" />

          {portfolioItems.edges.map(({ node }) => {
            const { fields } = node;
            const { category, slug, summary, summaryShort, title, titleShort, thumbnail } = fields;
            const displayTitle = titleShort || title;
            const displaySummary = summaryShort || summary;

            return (
              <Fragment key={slug}>
                <PortfolioCard
                  category={category}
                  slug={slug}
                  summary={displaySummary}
                  title={displayTitle}
                  thumbnail={thumbnail}
                />
              </Fragment>
            );
          })}
        </GridLayout>
        <Divider light />
      </PageWrapper>
    </App>
  );
};

export const pageQuery = graphql`
  query portfolioItemsList($id: String!) {
    portfolioItems: allMdx(
      sort: { fields: [fields___order], order: ASC }
      filter: { fileAbsolutePath: { regex: "//content/work/" } }
    ) {
      edges {
        node {
          fields {
            category
            slug
            summary
            # summaryShort
            title
            # titleShort
            # thumbnail
          }
        }
      }
    }
    page: mdx(id: { eq: $id }) {
      fields {
        metaDescription
        slug
        summary
        title
      }
      body
      mdxAST
      rawBody
      id
    }
  }
`;

export default PortfolioList;
