## Shortly - URL shortner

Get short URL instant, use shortly shorten and replace long URL to short link.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty

### Screenshot

![shortly-URL-Shortner](https://user-images.githubusercontent.com/6918020/115962105-5ef79400-a537-11eb-8c22-7acfca6d49dd.png)

### Planning

![IMG_20210424_200048](https://user-images.githubusercontent.com/6918020/115962219-e3e2ad80-a537-11eb-9ebb-56e66593673b.jpg)

### Links

- Live Site URL: [Add live site URL here](https://shortly.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Vanilla JavaScript
- REST API
- Babel transpiler (old browser support)
- Parcel Package Bundler

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

Fetching URL Code snippets, see below:

```js
const getShortURL = async (url) => {
  const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
  const data = await response.json();
  return data;
};
```

### Continued development

Areas that I want to continue focus through this project is production
build ready code, connecting to kanban for issue tracking.

### Useful resources

- [Example resource 1](https://dev.to/deepaksisodiya/5-best-practices-for-clean-coding-in-javascript-26am) - This is an amazing article which helped me finally understand writing clean javascript code. I'd recommend it to anyone still learning this concept.

## Author

- Website - [blogtheorem](https://blogtheorem.com)
- Frontend Mentor - [@enggsuraj](https://www.frontendmentor.io/profile/enggsuraj)
- Twitter - [blogtheorem](https://www.twitter.com/blogtheorem)
