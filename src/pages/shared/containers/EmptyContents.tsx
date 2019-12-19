import React, { useContext } from 'react';
import { ApplicationContext } from '../../../contexts/ApplicationContext';
import { EmptyContents as Component } from '../components/EmptyContents';

interface OuterProps {
  message: string;
}

export const EmptyContents: React.FC<OuterProps> = props => {
  const { applicationValues, setApplicationValues } = useContext(
    ApplicationContext,
  );

  const onClick = () => {
    setApplicationValues({
      ...applicationValues,
      isOpenNoteForm: true,
    });
  };

  return <Component message={props.message} onClickButton={onClick} />;
};
