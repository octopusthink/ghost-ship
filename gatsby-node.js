const path = require('path');

const moment = require('moment');

const config = require('./config');

const { postsPerPage, useDatesInSlugs } = config;

const makeBlogPosts = ({ actions, blogPosts }) => {
  const { createPage } = actions;

  blogPosts.edges.sort((postA, postB) => {
    const dateA = moment.utc(postA.node.frontmatter.date);
    const dateB = moment.utc(postB.node.frontmatter.date);

    if (dateA.isBefore(dateB)) {
      return 1;
    }
    if (dateB.isBefore(dateA)) {
      return -1;
    }

    return 0;
  });

  blogPosts.edges.forEach((edge, index) => {
    const nextID = index + 1 < blogPosts.edges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : blogPosts.edges.length - 1;
    const nextEdge = blogPosts.edges[nextID];
    const prevEdge = blogPosts.edges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: path.resolve('src/templates/BlogPost.js'),
      context: {
        id: edge.node.id,
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: `${nextEdge.node.fields.slug}`,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: `${prevEdge.node.fields.slug}`,
      },
    });
  });

  const numberOfPages = Math.ceil(blogPosts.edges.length / postsPerPage);

  Array(numberOfPages)
    .fill(null)
    .forEach((item, i) => {
      const index = i + 1;
      createPage({
        path: index === 1 ? `/blog` : `/blog/page=${index}`,
        component: path.resolve('src/templates/BlogList.js'),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: index,
          numberOfPages,
          postsPerPage,
        },
      });
    });
};

const makePages = ({ actions, pages }) => {
  const { createPage } = actions;

  if (pages) {
    pages.edges.forEach((edge, index) => {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${edge.node.fields.component}.js`,
        ),
        context: {
          id: edge.node.id,
          slug: edge.node.fields.slug,
        },
      });
    });
  }
};

const onCreateNode = ({ actions, node, getNode }) => {
  const { createNodeField } = actions;
  let slug;

  if (node.internal.type === 'MarkdownRemark') {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    // If this node contains date info, load the date and set it in the fields.
    const dateMatch = parsedFilePath.name.match(/^(\d{4}-\d{2}-\d{2})-(.*)/);

    let date;
    if (dateMatch) {
      date = moment.utc(dateMatch[1]);

      if (!date || !date.isValid) {
        console.warn(`WARNING: Invalid date for ${parsedFilePath.name}`);
      }

      createNodeField({
        node,
        name: 'date',
        value: date.toISOString(),
      });
    }

    createNodeField({
      node,
      name: 'component',
      value:
        node.frontmatter && node.frontmatter.component
          ? node.frontmatter.component
          : 'Page',
    });

    // We try to create slugs automatically to reduce the amount of frontmatter
    // authors need to write. Frontmatter support, however, still exists for
    // overrides, if the user desires it.
    //
    // For pages, we use:
    //
    //   1. The page's path + `slug` field in frontmatter. If the `slug` field
    //      were set to `"hello"` in `pages/foo.md` the slug would be `/hello`.
    //      If it were in `pages/something/foo.md` the slug would be
    //      `/something/hello`.
    //   2. The page's path + filename; eg. `pages/about.md` -> `/about`,
    //      `pages/projects/nautilus.md` -> `/projects/nautilus`.
    const datePrefix = date && useDatesInSlugs ? `${dateMatch[1]}-` : '';
    const fileName = date ? dateMatch[2] : parsedFilePath.name;

    if (parsedFilePath.dir.match(/^pages/)) {
      const pathWithoutPagesFolder = parsedFilePath.dir.replace(
        /^pages\/?/,
        '',
      );

      if (node.frontmatter && node.frontmatter.slug) {
        slug = `/${pathWithoutPagesFolder}/${node.frontmatter.slug}`;
      } else {
        slug = `/${pathWithoutPagesFolder}/${fileName}`;
      }
    } else {
      if (node.frontmatter && node.frontmatter.slug) {
        slug = `/${parsedFilePath.dir}/${datePrefix}${node.frontmatter.slug}`;
      } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
        slug = `/${parsedFilePath.dir}/${datePrefix}${fileName}`;
      } else {
        slug = `/${parsedFilePath.dir}`;
      }
    }

    // Create the slug, changing `/index` to `/` and removing any double
    // slashes in slugs.
    createNodeField({
      node,
      name: 'slug',
      value: slug.replace(/\/index$/, '/').replace(/\/{2,}/g, '/'),
    });

    // Create fields for every other frontmatter prop; this makes it easier to
    // query for fields instead of needing to know what's in `node.fields` and
    // what's in `node.frontmatter`.
    Object.keys(node.frontmatter)
      .filter((key) => {
        return ['component', 'date', 'slug'].indexOf(key) === -1;
      })
      .forEach((key) => {
        createNodeField({
          node,
          name: key,
          value: node.frontmatter[key],
        });
      });
  }
};

const createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const markdownQueryResult = await graphql(`
    query {
      blogPosts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//content/blog/" } }
      ) {
        edges {
          node {
            id
            frontmatter {
              author
              title
              tags
            }
            fields {
              date
              slug
            }
          }
        }
      }
      pages: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//content/pages/" } }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
            }
            fields {
              component
              slug
            }
          }
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const categorySet = new Set();

  const { blogPosts, pages } = markdownQueryResult.data;

  makeBlogPosts({ actions, blogPosts });
  makePages({ actions, pages });
};

module.exports = { createPages, onCreateNode };
