import React from 'react';

interface ImageProps {
  src: string;
}

const Image: React.FC<ImageProps> = ({ src }) => {
  const replaceImage = (error: React.SyntheticEvent<HTMLImageElement>) => {
    error.currentTarget.src =
      'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/ETH.svg';
  };

  return (
    <img alt="logo" width={25} src={src} height={25} onError={replaceImage} />
  );
};

export default Image;
