import React from 'react';

const Footer = () => {
  return (
    <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
      <FooterLink
        text={'About'}
        link={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
      />
      <FooterLink
        text={'Contact'}
        link={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
      />
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
