import React, { MouseEventHandler } from 'react';

const Button = ({
  text,
  action,
}: {
  text: String;
  action: MouseEventHandler;
}) => {
  return (
    <button
      onClick={action}
      className="static m-3 flex h-fit w-auto justify-center rounded-lg border border-black bg-gray-200 p-2 dark:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2"
    >
      {text}
    </button>
  );
};

export default Button;
