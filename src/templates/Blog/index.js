import { Heading, Link, List, Paragraph } from '@octopusthink/nautilus';
import { graphql } from 'gatsby';
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import App from '../app';

export const BlogList = (props) => {
  const { data, pageContext } = props;
  const siteDescription = 'foo';
  const { posts } = data;
  const { numberOfPages, currentPage } = pageContext;

  return (
    <App>
      <Helmet>
        <meta name="description" content={siteDescription} />
        <title>Blog Posts</title>
      </Helmet>

      {posts.edges.map(({ node }) => {
        const { author, date, slug, title } = node.fields;
        return (
          <Fragment key={slug}>
            <Link to={slug}>
              <Heading level={2}>{title}</Heading>
            </Link>
            <Paragraph>{date}</Paragraph>
            <Paragraph>By {author}</Paragraph>
          </Fragment>
        );
      })}

      {numberOfPages > 1 && (
        <List>
          {Array(numberOfPages)
            .fill(null)
            .map((item, i) => {
              const index = i + 1;
              const link = index === 1 ? '/blog' : `/blog/page=${index}`;

              return (
                <List.Item key={link}>
                  {currentPage === index ? (
                    <span>{index}</span>
                  ) : (
                    <Link to={link}>{index}</Link>
                  )}
                </List.Item>
              );
            })}
        </List>
      )}
    </App>
  );
};

export const pageQuery = graphql`
  query blogPostsList($skip: Int!, $limit: Int!) {
    posts: allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "//content/blog/" } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            author
            date
            slug
            title
            tags
          }
        }
      }
    }
  }
`;

export default BlogList;
