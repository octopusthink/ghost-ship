import { Icon, Link } from '@octopusthink/nautilus';
import React from 'react';
import { css } from '@emotion/core';

const Header = () => {
  return (
    <header
      css={css`
        display: flex;
        justify-content: space-between;
        font-weight: 600;
        border-bottom: 3px solid #393f49;
        font-family: -apple-system, BlinkMacSystemFont, San Francisco, Roboto,
          Segoe UI, Helvetica Neue, sans-serif;
        font-size: 1.8rem;
        font-weight: 500;
        align-items: center;

        @media screen and (max-width: 639px) {
          margin-bottom: 64px;
        }

        a {
          text-decoration: none;
          border: none;
          color: #393f49;
          padding-bottom: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          grid-gap: 4px;

          &:hover {
            color: #a42769;
          }

          @media screen and (max-width: 639px) {
            padding: 16px 8px;
            font-size: 1.6rem;
          }
        }
      `}
    >
      <Link
        to="/"
        css={css`
          font-size: 2.6rem;
          align-items: start !important;

          @media screen and (max-width: 639px) {
            font-size: 2.6rem !important;
            padding: 8px 0 !important;
          }
        `}
      >
        Octopus Think
      </Link>

      <nav
        css={css`
          z-index: 1;
        `}
      >
        <ul
          css={css`
            list-style-type: none;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;

            @media screen and (max-width: 639px) {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              margin-left: -40px;
              grid-gap: 0;
              justify-content: space-between;
              width: calc(100% + 40px);
              background: white;
              margin-bottom: 0;
              border-top: 2px solid #393f49;
            }

            @media screen and (min-width: 640px) {
              grid-gap: 24px;
            }
          `}
        >
          <li>
            <Link to="/">
              <Icon name="compass" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/about">
              <Icon name="help-circle" />
              About
            </Link>
          </li>
          <li>
            <Link to="/blog">
              <Icon name="book" />
              Blog
            </Link>
          </li>
          <li>
            <Link to="/services">
              <Icon name="coffee" />
              Services
            </Link>
          </li>
          <li>
            <Link to="/work">
              <Icon name="camera" />
              Work
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <Icon name="send" />
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
