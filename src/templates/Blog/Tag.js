import { graphql } from 'gatsby';
import React, { Fragment } from 'react';

import Divider from 'components/Divider';
import PageBody from 'components/PageBody';
import PageHeader from 'components/PageHeader';
import PageWrapper from 'components/PageWrapper';
import PostCard from 'components/PostCard';
import SEO from 'components/SEO';
import App from 'templates/App';

export const BlogTags = (props) => {
  const { data, pageContext } = props;
  const { posts, tag } = data;

  let pageSummary;
  let pageTitle;
  if (tag.edges.length > 0) {
    const tagData = tag.edges[0].node;
    pageTitle = `Posts tagged #${tagData.name}`;
    pageSummary = tagData.summary;
  } else {
    pageTitle = `Posts tagged #${pageContext.tag}`;
    pageSummary = `An archive of blog posts tagged #${pageContext.tag}`;
  }

  return (
    <App>
      <SEO title={pageTitle} description={pageSummary} />
      <PageWrapper>
        <PageHeader pageTitle={pageTitle} summary={pageSummary} />
        <PageBody>
          {posts.edges.map(({ node }) => {
            const { date, readingTime, slug, summary, title } = node.fields;

            return (
              <Fragment key={slug}>
                <PostCard
                  date={date}
                  readingTime={readingTime}
                  slug={slug}
                  summary={summary}
                  title={title}
                />
              </Fragment>
            );
          })}
        </PageBody>
        <Divider light />
      </PageWrapper>
    </App>
  );
};

export const pageQuery = graphql`
  query($tagId: String!, $nowTimestamp: Int!) {
    posts: allMdx(
      sort: { fields: [fields___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//content/blog/" }
        fields: { timestamp: { lte: $nowTimestamp }, tags: { elemMatch: { id: { eq: $tagId } } } }
      }
    ) {
      edges {
        node {
          fields {
            authors {
              bio
              id
              name
            }
            date
            # readingTime {
            #   text
            # }
            slug
            summary
            title
            tags {
              id
              name
              summary
            }
          }
          timeToRead
        }
      }
    }
    tag: allTagsYaml(filter: { id: { eq: $tagId } }) {
      edges {
        node {
          id
          summary
          name
        }
      }
    }
  }
`;

export default BlogTags;
