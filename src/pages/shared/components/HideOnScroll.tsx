import React from 'react';
import { Slide, useScrollTrigger } from '@material-ui/core';

interface Props {
  window?: () => Window;
}

export const HideOnScroll: React.FC<Props> = ({ children, window }) => {
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};
