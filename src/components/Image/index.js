import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';

const Image = (props) => {
  const { src } = props;
  const imageSrc = src.split('/')[src.split('/').length - 1];

  const { images } = useStaticQuery(graphql`
    {
      images: allImageSharp {
        nodes {
          id
          fluid(jpegProgressive: true) {
            base64
            # tracedSVG
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
            originalImg
            originalName
            presentationWidth
            presentationHeight
          }
          fixed(height: 240, width: 240) {
            aspectRatio
            base64
            height
            src
            srcSet
            width
          }
        }
      }
    }
  `);

  const imagesFound = images.nodes.filter((node) => {
    return node.fluid.originalName === imageSrc;
  });

  if (imagesFound.length === 0) {
    return null;
  }

  if (imagesFound.length > 1) {
    throw new Error(
      "More than one image with the same filename found. We are returning the first one found by GraphQL, but this may be the wrong image. You will need to use a custom component for this image or rename your image file. This is a limitation of Gatsby's StaticQuery API and Ghost Ship's dynamic `<Image />` component.",
    );
  }

  const [image] = imagesFound;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Img {...props} fluid={image.fluid} />;
};

export default Image;
