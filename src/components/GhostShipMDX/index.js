import { MDXProvider } from '@mdx-js/react';
import {
  Emphasis,
  Heading,
  List,
  Link,
  PageTitle,
  Paragraph,
  Strong,
} from '@octopusthink/nautilus';
import React from 'react';

import Image from 'components/Image';
import config from 'data/SiteConfig';

const components = {
  /* eslint-disable react/jsx-props-no-spreading */
  h1: (props) => <PageTitle {...props} />,
  h2: (props) => <Heading {...props} level={2} />,
  h3: (props) => <Heading {...props} level={3} />,
  h4: (props) => <Heading {...props} level={4} />,
  p: (props) => <Paragraph {...props} />,
  ul: (props) => <List {...props} />,
  ol: (props) => <List {...props} ordered />,
  li: (props) => <List.Item {...props} />,
  a: (originalProps) => {
    const { href } = originalProps;
    const props = { ...originalProps };

    if (href.startsWith('/') && !href.startsWith('//')) {
      props.to = href;
      delete props.href;
    } else {
      props.as = 'a';
      if (!href.startsWith('mailto:') && !href.startsWith(config.siteUrl)) {
        props.external = true;
      }
    }

    return <Link {...props} />;
  },
  img: (props) => <Image {...props} />,
  div: (props) => <div {...props} />,
  strong: (props) => <Strong {...props} />,
  emphasis: (props) => <Emphasis {...props} />,
  /* eslint-enable react/jsx-props-no-spreading */
};

const GhostShipMDX = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
);

export default GhostShipMDX;
