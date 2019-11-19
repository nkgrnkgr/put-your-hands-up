import React from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  title: string;
}

export const HtmlTitle: React.FC<Props> = ({ title }) =>
  title ? (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  ) : (
    <div />
  );
