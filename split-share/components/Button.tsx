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
      className="static m-3 flex h-fit w-auto justify-center rounded-lg border border-black border-transparent  bg-button-bg from-inherit p-2 hover:border-gray-300 lg:mx-2"
    >
      {text}
    </button>
  );
};

export default Button;
