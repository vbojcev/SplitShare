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
