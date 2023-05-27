import React from 'react';

const Footer = () => {
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
      <FooterLink text={'About'} />
      <FooterLink text={'Contact'} />
      <FooterLink text={'Source Code'} />
    </div>
  );
};

const FooterLink = ({ text }: { text: string }) => {
  return <p className="my-1 flex w-auto justify-center px-5">{text}</p>;
};

export default Footer;
