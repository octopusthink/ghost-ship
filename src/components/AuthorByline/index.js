import { Heading, Paragraph, Tags } from '@octopusthink/nautilus';
import React from 'react';
import { css } from '@emotion/core';

const AuthorByline = (props) => {
  const { alt, avatar, children, name } = props;

  return (
    <div>
      <img src={avatar} alt={alt} />

      <div>
        <Tags label="Job title">
          <Tags.Tag>Written by</Tags.Tag>
        </Tags>
        <Heading
          level={2}
          css={css`
            margin-bottom: 0;
          `}
        >
          {name}
        </Heading>
      </div>

      <Paragraph
        small
        css={css`
          margin-bottom: 0;
        `}
      >
        {children}
      </Paragraph>
    </div>
  );
};

export default AuthorByline;
