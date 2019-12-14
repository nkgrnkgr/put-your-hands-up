import { Link } from '@material-ui/core';
import React from 'react';

interface Props {
  comment: string;
}

const URL_REGEXP =
  '^(http[s]?:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?';

const HASHTAG_REGEXP = '^#';

const isUrl = (line: string) => new RegExp(URL_REGEXP).test(line);
const isHashTag = (line: string) => new RegExp(HASHTAG_REGEXP).test(line);

const createAnchor = (line: string) => (
  <Link href={line} color="secondary" rel="noopener noreferrer" target="_blank">
    <br />
    {line}
  </Link>
);

const createHashTagAnchor = (line: string) => (
  <Link
    href={`https://twitter.com/hashtag/${line.replace('#', '')}`}
    color="secondary"
    rel="noopener noreferrer"
    target="_blank"
  >
    <br />
    {line}
  </Link>
);

const createLine = (line: string) => {
  if (isUrl(line)) {
    return createAnchor(line);
  }

  if (isHashTag(line)) {
    return createHashTagAnchor(line);
  }

  return line;
};

export const HTMLTextContent: React.FC<Props> = ({ comment }) => {
  return (
    <div>
      {comment.split(/\s/).map((line, index) => (
        <span key={index}>{createLine(line)}</span>
      ))}
    </div>
  );
};
