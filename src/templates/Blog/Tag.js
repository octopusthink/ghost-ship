import { Heading, Link, Paragraph } from '@octopusthink/nautilus';
import { graphql } from 'gatsby';
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import App from '../app';

export const BlogTags = (props) => {
  const { data } = props;
  const siteDescription = 'foo';
  const { posts } = data;

  return (
    <App>
      <Helmet>
        <meta name="description" content={siteDescription} />
        <title>Tag</title>
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
    </App>
  );
};

export const pageQuery = graphql`
  query blogPostsTags($tag: String!) {
    posts: allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//content/blog/" }
        fields: { tags: { eq: $tag } }
      }
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

export default BlogTags;
