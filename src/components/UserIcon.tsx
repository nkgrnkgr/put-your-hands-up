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
  const { avatarUrl, isAnonymous = false, anonymousColor = '#000000' } = user;
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
    case '#3f92e3':
      return anonymousBluePng;
    case '#548e6a':
      return anonymousGreenPng;
    case '#f0b43a':
      return anonymousOrangePng;
    case '#f6cce5':
      return anonymousPinkPng;
    case '#51447c':
      return anonymousPurplePng;
    case '#e84259':
      return anonymousRedPng;
    default:
      return anonymousBlackPng;
  }
};

export default userIcon;
