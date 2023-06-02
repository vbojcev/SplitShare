'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

const Provider = ({
  children,
}: /*session,*/
{
  children: React.ReactNode;
}) => {
  return <SessionProvider /*session={session}*/>{children}</SessionProvider>;
};

export default Provider;
