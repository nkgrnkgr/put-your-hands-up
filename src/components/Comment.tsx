import * as React from 'react';

export interface CommentProps {
  text: string;
}

const URL_REGEXP =
  '^(http[s]?:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?';

const regex = new RegExp(URL_REGEXP);

const comment: React.SFC<CommentProps> = ({ text }) => {
  return (
    <div className="content">
      {text.split(/\r\n|\n/).map((line, index) => {
        return <span key={index}>{createLine(line)}</span>;
      })}
    </div>
  );
};

const createLine = (line: string) => {
  return (
    <>
      {isUrl(line) ? createAnchor(line) : line}
      <br />
    </>
  );
};

const createAnchor = (line: string) => {
  return (
    <a href={line} target="_blank">
      {line}
      <br />
    </a>
  );
};

const isUrl = (line: string): boolean => {
  return regex.test(line);
};

export default comment;
