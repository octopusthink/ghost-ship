import { Heading, Icon, Link, Tags } from '@octopusthink/nautilus';
import React from 'react';
import { css } from '@emotion/core';

const SequentialLink = (props) => {
  const { direction, title, to } = props;
  let arrowIcon;
  if (direction === 'next') {
    arrowIcon = 'arrow-right';
  }
  if (direction === 'previous') {
    arrowIcon = 'arrow-left';
  }

  return (
    <Link
      to={to}
      css={css`
        border: 0;
        display: flex;
        align-items: center;
        justify-content: end;
        grid-gap: 0.8rem;

        ${direction === 'previous' &&
          css`
            text-align: left;
            flex-direction: row-reverse;
            justify-content: start;
          `}

        ${direction === 'next' &&
          css`
            text-align: right;
            flex-direction: row;
            justify-content: end;
          `}
      `}
    >
      <div>
        <Tags>
          <Tags.Tag>{direction} post</Tags.Tag>
        </Tags>
        <Heading
          level={3}
          css={css`
            margin-bottom: 0;
          `}
        >
          {title}
        </Heading>
      </div>
      <Icon
        name={arrowIcon}
        background="black"
        color="white"
        medium
        css={css`
          @media screen and (max-width: 480px) {
            display: none;
          }
        `}
      />
    </Link>
  );
};

export default SequentialLink;
