import * as React from 'react';
import { FirebaseUser } from 'domain/FirebaseUser';
import anonymousBlackPng from 'images/anonymous-black.png';
import anonymousBluePng from 'images/anonymous-blue.png';
import anonymousGreenPng from 'images/anonymous-green.png';
import anonymousOrangePng from 'images/anonymous-orange.png';
import anonymousPinkPng from 'images/anonymous-pink.png';
import anonymousPurplePng from 'images/anonymous-purple.png';
import anonymousRedPng from 'images/anonymous-red.png';
import { Color } from 'domain/Anonymous';

type imageSize = 32 | 64 | 128;

interface Props {
  user: FirebaseUser;
  isRoundedImg?: boolean;
  imageSize?: imageSize;
  customStyleForFigure?: {};
  customStyleForImg?: {};
}

const userIcon: React.SFC<Props> = ({
  user,
  isRoundedImg = false,
  imageSize = 32,
  customStyleForFigure,
  customStyleForImg
}) => {
  const { avatarUrl, isAnonymous = false, anonymousColor = 'black' } = user;
  return (
    <figure className="media-left" style={customStyleForFigure}>
      <p className={`image is-${imageSize}x${imageSize}`}>
        <img
          className={isRoundedImg ? 'is-rounded' : ''}
          src={isAnonymous ? anonyMounsImage(anonymousColor) : avatarUrl}
          style={customStyleForImg}
        />
      </p>
    </figure>
  );
};

const anonyMounsImage = (anonymousColor: Color): string => {
  switch (anonymousColor) {
    case 'blue':
      return anonymousBluePng;
    case 'green':
      return anonymousGreenPng;
    case 'orange':
      return anonymousOrangePng;
    case 'pink':
      return anonymousPinkPng;
    case 'purple':
      return anonymousPurplePng;
    case 'red':
      return anonymousRedPng;
    default:
      return anonymousBlackPng;
  }
};

export default userIcon;
