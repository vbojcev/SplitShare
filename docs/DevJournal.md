# Overview

A running journal of development to keep track of progress as well as random notes such as solutions to problems (includes even the most basic things like Linux commands and VSCode configuration). Uses DD/MM/YY format for entries.

## 08/05/23

The ultimate goal is to have this be both a web and mobile app (iOS).

I've decided to commit to using NextJS for this project for a few reasons.

1. It seems like a cohesive fullstack web framework with good documentation available.
2. Many people online seem to recommend it.
3. I already know the basics of React.
4. I haven't used it before. I consider this a reason to use it because in the real world I'll have to adapt to whatever my employer uses anyway, I'll be coming into it mostly blind and I won't necessarily have any experience with it.

One of my goals for the near future is to learn Typescript, from what I can see it makes JS into a typed language which I much prefer.

Going off of [NextJS Docs](https://nextjs.org/docs) and [NextJS Learn](https://nextjs.org/learn/foundations/about-nextjs).

## 14/05/23

I've started going through an old MERN tutorial project to re-familiarize myself with React. Also just found out that there's been a recent upheaval in Next where they are moving from a "page router" to "app router" system. I can only guess what those two mean but it feels like it's gonna get complicated since the app router docs are still being updated at this moment.

## 15/05/23

Did create-next-app with typescript, tailwind, and src folder (I don't know tailwind or typescript apart from what they do on a high level).

Explored layout.tsx and page.tsx, discovered new HTML/JSX syntax such as `&nbsp;` and `&gt;` which basically just input special characters (also works in markdown apparently &gt;), [source](https://www.w3schools.com/html/html_entities.asp). Need to figure out what the point of the layout.tsx file is.

Started reading through the React essentials page of the Next docs, learned about server vs client components.

Since all JS is valid TS, I think I'll write things in JS first and then migrate to TS.

Still have to figure out how testing works.

"Page" == unique to route, "layout" == common to children.

## 22/05/23

Will start doing some work. First need to figure out how to use Tailwind and will get a basic layout running.

Discovered a couple of things. First is that prettier can be installed as a dependency and not just a VSCode extension, and prettier config files take precedence over VScode configurations. To use a config file, you have to create it: [prettier.config.js](https://prettier.io/docs/en/configuration.html) in the root directory of a project. In Next.js this creates an error but it is fixed by following directions from [this post](https://stackoverflow.com/questions/68163385/parsing-error-cannot-find-module-next-babel) (it's an eslint problem). Also installed the [tailwind plugin for prettier](https://github.com/tailwindlabs/prettier-plugin-tailwindcss).

## 27/05/23

Started fiddling around with tailwind/css, specifically the header component. Trying to figure out how the responsiveness works. Found out about the [screen width](https://stackoverflow.com/questions/43445592/what-is-the-meaning-of-xs-md-lg-in-css-flexbox-system) (lg, xl, etc).

## 29/05/23

Installed bcrypt, mongodb, mongoose, next-auth as per JSMastery's tutorial.

## 30/05/23

Since I'm using TS, needed more info than tutorial. Found this link listing out the [types for the provider object](https://next-auth.js.org/v3/configuration/providers) from next auth.

[Next Auth Example repo](https://github.com/nextauthjs/next-auth-example)

All providers (redux toolkit query, regularly used files) should go in main layout.

Found a [good article](https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/) for how to implement nextauth in nextJS 13. Relevant [Twitter post](https://twitter.com/nextauthjs/status/1589719535363715072?lang=en).

## 31/05/23

The Google OAuth Client ID and Client Secret should be in .env under

The JSM tutorial might be using outdated logic, the useNewUrlParser option in mongoose.connect does not have a type definition and this seems to be because such deprecation options are no longer necessary: [link](https://stackoverflow.com/questions/56306484/type-error-using-usenewurlparser-with-mongoose-in-typescript). [official mongoose docs](https://mongoosejs.com/docs/migrating_to_6.html#no-more-deprecation-warning-options).

NextAuth needs some extra things in the .env: [link](https://next-auth.js.org/configuration/options).

Oauth2.0 providers (e.g google) require valid redirect URIs. Look at 1:43:00 of the JSM tutorial to see what you have to do (add the redirect URI to the google console).

Had to add the following in the next config to get the google profile image thing to work:

```js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};
```

TODO: Signing in sometimes takes a second. Maybe I can find a way to have a Suspense Component to indicate that things are happening and it's not just frozen.

## 01/06/23

Found out a way to protect from someone not being signed in accessing `/profile`:

```js
'use client';
import { useSession, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const page = () => {
  const [providers, setProviders] = useState(null);

  //pull user session:
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      setProviders(res);

      //if user not logged in, redirect to home
      if (!session?.user) {
        router.push('/');
      }
    })();
  }, []);

  return (
    <>
      {session?.user ? (
        <div className="relative flex place-items-center">
          <p>{session?.user ? session.user.name : 'ERROR'}'s profile.</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default page;
```

The extra `session?.user` check seems to be necessary, otherwise going to `/profile` while not logged in momentarily loads the JSX before useEffect() has any chance to redirect to home.

## 03/06/23

How to update Schema (will be useful for adding fields without having to reset absolutely everything): [link](https://stackoverflow.com/questions/50934800/add-field-not-in-schema-with-mongoose)

How to have multiple providers in next-auth: [link](https://next-auth.js.org/providers/credentials)

## 06/06/23

Thinking about how to extend workouts. Currently they are just a title + description. The most important feature is exercises, I think each exercise would be its own object containing:

- Name
- Number of sets
- Number of reps
- Short note (e.g "last rep until failure")

In the WorkoutForm, these would look like this:

| name |

| sets | reps |

| notes |

And there would be a button to add an exercise that would add more of these fields. [Tutorial for dynamic forms in React](https://www.freecodecamp.org/news/build-dynamic-forms-in-react/). One design decision I have yet to make is how to implement the exercises. It might be best to simply have them be their own schema+db, and have the workouts contain an array of IDs to these exercises. When fetching workouts, this array would be populated. Alternatively everything can be stored directly in the workout document, [this link](https://stackoverflow.com/questions/19695058/how-to-define-object-in-array-in-mongoose-schema-correctly-with-2d-geo-index) might help.

For the sets and reps, there would need to be some validation. [Link to mongoose validation docs](https://mongoosejs.com/docs/validation.html#built-in-validators). Also workouts would now have both creator and exercises that need to be populated, [link to how to do that](https://stackoverflow.com/questions/12821596/multiple-populates-mongoosejs).

Another addition to a workout can be a set of tags (hardcoded) to help filter workouts. This would be a flex-wrap container, and as each tag is selected it would change colour to indicate that.

- leg/chest/arm/glute/etc
- hypertrophy
- strength
- endurance
- athleticism

## 07/06/23

I've decided that the set of exercises within each workout will instead be an array of subdocuments in the workout schema instead of an array of objectIDs. There is not enough reason to separate exercises from workouts in separate databases.

## 08/06/23

Experiencing an issue in workout pages. If the post is saved and the user reloads the page, the button will say "save workout". Pressin the button causes an error because in the backend the user already has the post saved. The issue seems to be because checkSaved() runs in useEffect before useSession has time to get the session so it tries to check if an undefined user has the post saved. I should try to find a way to wait to run checkSaved() until the session has been established.

Ended up fixing it by adding session to the dependency array. This works because session changes from undefined to a session object, however this also means that the workout page always renders twice (and therefore makes two extra API calls...). There should be a better way to do this but it's pretty low priority right now.

## 10/06/23

The current goal is to add documentation and start enforcing typescript features.

## 31/10/23

Gonna try to migrate to a SQL-based DB. Should look into prisma: https://www.prisma.io/.

## 1/11/23

Found out about the [Vercel CLI](https://vercel.com/docs/cli).

Because of my weird file structure, to initialize the Vercel CLI and link the project I had to do so in the root directory because when I tried it in SplitShare/split-share/ it would make a new project in Vercel. But now when I use the CLI to get the environment variables it puts the .env.development.local in the root directory where it's not visible by the code. I could specify the file path but if I have to do that in multiple files then I think I'll just manually copy.

Now I'm deciding whether to use prisma or next.js's built-in SQL functionality... I think I'll use the nextjs postgres SDK: [docs](https://vercel.com/docs/storage/vercel-postgres).

## 2/11/23

Sike, I'm gonna use Supabase. Looks like it has more free features and I could even migrte my authentication over.

[Supabse with nextjs](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## 5/11/23

Some usefule links for implementing email + password auth:

[1](https://www.reddit.com/r/nextjs/comments/13c31xd/whats_the_best_way_to_implement_emailpassword/)

[2](https://www.reddit.com/r/nextjs/comments/161txhh/is_nextauth_authjs_well_suited_for_an/)

[3](https://github.com/ixartz/Next-js-Boilerplate)

[4](https://www.youtube.com/watch?v=PEMfsqZ2-As)

It seems to be highly recommended against, so I think I'll just stick with email magic links, maybe github too.
