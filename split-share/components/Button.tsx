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
      className="static m-3 flex h-fit w-auto justify-center rounded-lg border border-black border-transparent bg-gray-200 p-2 hover:border-gray-300 dark:bg-button-bg dark:from-inherit lg:mx-2"
    >
      {text}
    </button>
  );
};

export default Button;
