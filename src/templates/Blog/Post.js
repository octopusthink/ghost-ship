import { PageTitle, Paragraph } from '@octopusthink/nautilus';
import { graphql } from 'gatsby';
import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

import { markdown } from '../../utils/markdown';

import App from '../app';

export const BlogPost = (props) => {
  const { data } = props;
  const { post } = data;

  const { htmlAst } = post;
  const { author, date, slug, title } = post.fields;

  const content = markdown(htmlAst);

  return (
    <App>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Fragment key={slug}>
        <PageTitle>{title}</PageTitle>
        <Paragraph>{date}</Paragraph>
        <Paragraph>By {author}</Paragraph>
      </Fragment>
      {content}
    </App>
  );
};

export const pageQuery = graphql`
  query($id: String!) {
    post: markdownRemark(id: { eq: $id }) {
      fields {
        author
        date
        slug
        title
        tags
      }
      htmlAst
      rawMarkdownBody
      id
    }
  }
`;

export default BlogPost;
