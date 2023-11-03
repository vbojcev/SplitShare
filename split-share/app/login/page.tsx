'use client';

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {

  //pull user session:
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {

    // If user is logged in, shouldn't be able to view login page.
    if (session?.user) {
      router.push('/');
    }

  }, [session?.user]);

  return (
    <div className="relative flex place-items-center">
      <p>Login Placeholder</p>
    </div>
  );
};

export default page;
