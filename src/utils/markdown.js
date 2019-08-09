import {
  Heading,
  List,
  Link,
  PageTitle,
  Paragraph,
} from '@octopusthink/nautilus';
import React, { createElement } from 'react';
import RehypeReact from 'rehype-react';

export const markdown = (htmlAst) => {
  const renderAst = new RehypeReact({
    createElement,
    components: {
      h1: (props) => <PageTitle {...props} />,
      h2: (props) => <Heading {...props} level={2} />,
      h3: (props) => <Heading {...props} level={3} />,
      h4: (props) => <Heading {...props} level={4} />,
      p: (props) => <Paragraph {...props} />,
      ul: (props) => <List {...props} />,
      ol: (props) => <List {...props} ordered />,
      li: (props) => <List.Item {...props} />,
      a: (originalProps) => {
        const props = { ...originalProps };

        if (props.href.startsWith('/') && !props.href.startsWith('//')) {
          props.to = props.href;
          delete props.href;
        } else {
          props.as = 'a';
          if (!props.href.startsWith('mailto:')) {
            props.external = true;
          }
        }

        return <Link {...props} />;
      },
    },
  }).Compiler;

  return renderAst(htmlAst);
};
