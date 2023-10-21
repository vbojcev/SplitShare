import React from 'react';

const Footer = () => {
  return (
    <div className="z-10 w-full items-center justify-center py-4 font-mono text-sm lg:flex lg:border-t-2 lg:bg-zinc-800">
      <FooterLink
        text={'Source Code'}
        link={'https://github.com/vbojcev/SplitShare'}
      />
    </div>
  );
};

const FooterLink = ({ text, link }: { text: string; link: string }) => {
  return (
    <a href={link} className="my-1 flex w-auto justify-center px-5">
      {text}
    </a>
  );
};

export default Footer;
