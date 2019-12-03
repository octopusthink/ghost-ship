const fs = require('fs');
const path = require('path');

const { kebabCase } = require('lodash');
const moment = require('moment');
const { singular } = require('pluralize');

const siteConfig = require('./data/SiteConfig');

const projectPath = path.resolve(fs.realpathSync(process.cwd()), '.');
const srcPath = path.resolve(fs.realpathSync(process.cwd()), 'src');

const {
  enableBlogAuthors,
  enableBlog,
  enableBlogTags,
  enablePortfolio,
  postsPerPage,
  useDatesInSlugs,
} = siteConfig;

// Gatsby Integers only support 32-bit integers, so this uses that as the
// maximum timestamp value. Sort of a hack, but using `Number.MAX_SAFE_INTEGER`
// will throw errors.
const nowTimestamp =
  process.env.NODE_ENV === 'production' || process.env.HIDE_FUTURE_POSTS
    ? parseInt(moment.utc().format('X'), 10)
    : 2147483647;

// Tags used across the site.
const siteTags = new Set();

const makeBlogPosts = ({ actions, blogPosts }) => {
  const { createPage } = actions;

  const postsToPublish = blogPosts.edges.filter((edge) => {
    return edge.node.fields.timestamp <= nowTimestamp;
  });

  postsToPublish.sort((postA, postB) => {
    const dateA = moment.utc(postA.node.fields.date);
    const dateB = moment.utc(postB.node.fields.date);

    if (dateA.isBefore(dateB)) {
      return 1;
    }
    if (dateB.isBefore(dateA)) {
      return -1;
    }

    return 0;
  });

  postsToPublish.forEach((edge, index) => {
    const nextID = index + 1 < postsToPublish.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postsToPublish.length - 1;
    const nextEdge = postsToPublish[nextID];
    const prevEdge = postsToPublish[prevID];

    // Don't create blog posts in the future when building for production.
    if (edge.node.fields.timestamp <= nowTimestamp) {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve('src/templates/Blog/Post.js'),
        context: {
          nowTimestamp,
          id: edge.node.id,
          slug: edge.node.fields.slug,
          nexttitle: nextEdge.node.fields.title,
          nextslug: `${nextEdge.node.fields.slug}`,
          prevtitle: prevEdge.node.fields.title,
          prevslug: `${prevEdge.node.fields.slug}`,
        },
      });

      if (edge.node.fields.tags) {
        edge.node.fields.tags.forEach((tag) => {
          siteTags.add(tag);
        });
      }
    }
  });

  const numberOfPages = Math.ceil(postsToPublish.length / postsPerPage);

  Array(numberOfPages)
    .fill(null)
    .forEach((item, i) => {
      const index = i + 1;
      createPage({
        path: index === 1 ? `/blog` : `/blog/page=${index}`,
        component: path.resolve('src/templates/Blog/index.js'),
        context: {
          nowTimestamp,
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: index,
          numberOfPages,
          postsPerPage,
        },
      });
    });
};

// Make pages for each blog tag.
const makeBlogTags = ({ actions, tags }) => {
  const { createPage } = actions;

  tags.forEach((tag) => {
    const slug = `/blog/tags/${tag.id}/`;

    createPage({
      path: slug,
      component: path.resolve('src/templates/Blog/Tag.js'),
      context: { nowTimestamp, slug, tagId: tag.id },
    });
  });
};

const makePortfolioPages = ({ actions, portfolioItems }) => {
  const { createPage } = actions;

  portfolioItems.edges.forEach((edge) => {
    // Create pages for each of the portfolio items.
    createPage({
      path: edge.node.fields.slug,
      component: path.resolve('src/templates/Portfolio/Single.js'),
      context: {
        id: edge.node.id,
        slug: edge.node.fields.slug,
      },
    });
  });
};

// Create pages of any other type.
const makePages = ({ actions, pages }) => {
  const { createPage } = actions;

  if (pages) {
    pages.edges.forEach((edge) => {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(`src/templates/${edge.node.fields.component}.js`),
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

  if (['MarkdownRemark', 'Mdx'].includes(node.internal.type)) {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);

    // If this node contains date info, load the date and set it in the fields.
    const dateMatch = parsedFilePath.name.match(/^(\d{4}-\d{2}-\d{2})-(.*)/);

    let date;
    if (dateMatch) {
      date = moment.utc(dateMatch[1]);

      if (!date || !date.isValid) {
        // eslint-disable-next-line no-console
        console.warn(`WARNING: Invalid date for ${parsedFilePath.name}`);
      }

      createNodeField({
        node,
        name: 'date',
        value: date.toISOString(),
      });

      createNodeField({
        node,
        name: 'timestamp',
        value: parseInt(date.format('X'), 10),
      });

      createNodeField({
        node,
        name: 'updated',
        value: node.frontmatter.updated ? node.frontmatter.updated : null,
      });
    }

    const rootFolder = parsedFilePath.dir.split('/')[0];

    // "Page" is the default, fallback component if nothing else can be found.
    let component = 'Page';
    if (node.frontmatter && node.frontmatter.component) {
      component = node.frontmatter.component;
    } else if (rootFolder) {
      try {
        fs.statSync(`src/templates/${rootFolder}.js`);
      } catch (error) {
        // This means we don't have a template file that matches the name
        // of the component's root folder, which is fine. We'll use the `Page`
        // component default defined above.
        if (error.code !== 'ENOENT') {
          throw error;
        }
      }
      component = singular(kebabCase(rootFolder));
      component = `${component.charAt(0).toUpperCase()}${component.slice(1)}`;
    }

    createNodeField({
      node,
      name: 'component',
      value: component,
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
      const pathWithoutPagesFolder = parsedFilePath.dir.replace(/^pages\/?/, '');

      if (node.frontmatter && node.frontmatter.slug) {
        slug = `/${pathWithoutPagesFolder}/${node.frontmatter.slug}`;
      } else {
        slug = `/${pathWithoutPagesFolder}/${fileName}`;
      }
    } else if (node.frontmatter && node.frontmatter.slug) {
      slug = `/${parsedFilePath.dir}/${datePrefix}${node.frontmatter.slug}`;
    } else if (parsedFilePath.name !== 'index' && parsedFilePath.dir !== '') {
      slug = `/${parsedFilePath.dir}/${datePrefix}${fileName}`;
    } else {
      slug = `/${parsedFilePath.dir}`;
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
  const markdownQueryResult = await graphql(`
    query {
      blogPosts: allMdx(filter: {
        fileAbsolutePath: { regex: "//content/blog/" }
        fields: { timestamp: { lte: ${nowTimestamp} } }
      }) {
        edges {
          node {
            id
            fields {
              authors {
                id
                avatar
                name
                bio
              }
              date
              slug
              timestamp
              title
              tags {
                id
                name
                summary
              }
              updated
            }
          }
        }
      }
      portfolioItems: allMdx(filter: {
        fileAbsolutePath: { regex: "//content/portfolio/" }
      }) {
        edges {
          node {
            id
            fields {
              slug
              title
            }
          }
        }
      }
      pages: allMdx(filter: { fileAbsolutePath: { regex: "//content/(?!blog|portfolio).+?/" } }) {
        edges {
          node {
            id
            fields {
              component
              slug
              title
            }
          }
        }
      }
    }
  `);

  if (markdownQueryResult.errors) {
    // eslint-disable-next-line no-console
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const { blogPosts, pages, portfolioItems } = markdownQueryResult.data;

  // If we're running a blog, create the blog post pages.
  if (enableBlog) {
    makeBlogPosts({ actions, blogPosts });
    makeBlogTags({
      actions,
      blogPosts,
      tags: siteTags,
    });
  }

  // Create portfolio pages, if they're enabled.
  if (enablePortfolio) {
    makePortfolioPages({
      actions,
      portfolioItems,
    });
  }

  makePages({ actions, pages });
};

const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      extensions: ['.mjs', '.jsx', '.js', '.json'],
      modules: [srcPath, projectPath, 'node_modules'],
    },
  });
};

module.exports = { createPages, onCreateNode, onCreateWebpackConfig };
