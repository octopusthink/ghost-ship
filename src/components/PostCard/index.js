import {
  Button,
  Link,
  Heading,
  Paragraph,
  Tags,
  VisuallyHidden,
  metadata,
  useTheme,
} from '@octopusthink/nautilus';
import React from 'react';
import { css } from '@emotion/core';
import dayjs from 'dayjs';

import config from 'data/SiteConfig';

const PostCard = (props) => {
  const theme = useTheme();
  const { date, readingTime, slug, summary, title } = props;
  const formattedDate = dayjs(date).format(config.dateFormat);

  return (
    <article
      css={css`
        margin-bottom: 6.4rem;
      `}
    >
      <header>
        <div
          css={css`
            margin-bottom: 0.4rem;
          `}
        >
          <Tags label="Date Published">
            <Tags.Tag>{formattedDate}</Tags.Tag>
          </Tags>

          <span
            css={css`
              ${metadata.small(theme)};
              color: ${theme.colors.neutral.grey800};
              padding: 0 0.4rem 0.4rem 0;
            `}
          >
            &middot;
          </span>

          <Tags label="Reading time">
            <Tags.Tag>
              {readingTime} min<VisuallyHidden>ute</VisuallyHidden> read
            </Tags.Tag>
          </Tags>
        </div>
        <Link tabIndex="-1" to={slug}>
          <Heading
            css={css`
              margin-bottom: 1.6rem;
            `}
            level={2}
          >
            {title}
          </Heading>
        </Link>
      </header>
      <Paragraph
        css={css`
          margin-bottom: 0;
        `}
      >
        {summary}
      </Paragraph>
      <footer>
        <Button
          to={slug}
          css={css`
            border: 0;
            margin-left: 0;

            &:hover {
              box-shadow: none;
              color: ${theme.colors.state.hoverText};
            }
          `}
          navigation
          minimal
        >
          Continue reading<VisuallyHidden> {title}</VisuallyHidden>
        </Button>
      </footer>
    </article>
  );
};

export default PostCard;
