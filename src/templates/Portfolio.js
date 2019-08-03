import { graphql } from 'gatsby';
import React from 'react';
import Helmet from 'react-helmet';

import { markdown } from '../utils/markdown';

import App from './app';

export const Portfolio = (props) => {
  const { data } = props;

  const { portfolioPiece } = data;
  const { htmlAst } = portfolioPiece;
  const { title } = portfolioPiece.fields;

  const content = markdown(htmlAst);

  return (
    <App>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {content}
    </App>
  );
};

export const pageQuery = graphql`
  query($id: String!) {
    portfolioPiece: markdownRemark(id: { eq: $id }) {
      fields {
        slug
        title
      }
      htmlAst
      rawMarkdownBody
      id
    }
  }
`;

export default Portfolio;
