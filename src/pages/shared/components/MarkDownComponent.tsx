import React from 'react';
import ReactMarkDown from 'react-markdown';

interface Props {
  text: string;
}

export const MarkDownComponent: React.FC<Props> = ({ text }) => {
  return (
    <>
      <ReactMarkDown source={text} escapeHtml={false} />
    </>
  );
};
