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
