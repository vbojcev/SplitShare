import Link from 'next/link';

const Header = () => {
  return (
    <div className="z-10 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex">
      <Link href="/" className="flex w-auto justify-center text-2xl font-bold">
        SplitShare
      </Link>
      <div className="z-10 w-full max-w-5xl items-center font-mono text-sm lg:flex lg:justify-end">
        <HeaderElement text={'Profile'} route={'/profile'} />
      </div>
    </div>
  );
};

const HeaderElement = ({ text, route }: { text: string; route: string }) => {
  return (
    <Link
      href={route}
      className="static my-1 flex w-auto justify-center rounded-xl border border-b border-gray-300 bg-gray-200 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:mx-2"
    >
      {text}
    </Link>
  );
};

export default Header;
