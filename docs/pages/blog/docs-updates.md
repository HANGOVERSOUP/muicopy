---
title: 'New documentation structure: better navigate MUI's products'
description: From now on, each MUI product will live in its own documentation. Find out how that is better for you.
date: 2022-04-06T00:00:00.000Z
authors: ['danilo-leal']
tags: ['News']
---

As MUI continues to grow beyond our flagship product, Material UI (we [rebranded the company](/blog/material-ui-is-now-mui/) last year as a first step), it has become clear that the documentation for our products can no longer all live under one roof.

That's why we're excited to announce that we are shipping a major upgrade to our documentation, to make it easier than ever to find exactly what you need—no matter which MUI products you're working with.

## Wait... what MUI products are you talking about?

We currently offer two main product lines:

- **MUI Core—**a collection of foundational component libraries, including:
  - _Material UI_—components that implement Google's Material Design
  - _MUI Base_—unstyled components for implementing your own design system
  - _MUI System_—CSS utilities for quickly laying out design systems
- **MUI X**—a collection of advanced components for complex use cases, including:
  - _Data Grid_—fast, feature-rich, extendable React data table
  - _Date and Time Pickers_—interface control components for selecting dates and times

## What has changed?

All MUI products still live under the [mui.com](http://mui.com) domain, but each of them now has its own respective URL and documentation.
We added an identifier and menu to the upper-left corner of the docs for improved navigation:

<img src="/static/blog/docs-updates/docs-separation.png" style="width: 796px; margin-top: 16px; margin-bottom: 16px;" alt="Screen shot of the product identifier menu" />

As for the URLs, this is how they look now:

- MUI Core:
  - Material UI: [https://mui.com/material-ui/\_](https://mui.com/material-ui/getting-started/installation/)
  - MUI Base: [https://mui.com/base/\_](https://mui.com/base/getting-started/installation/)
  - MUI System: [https://mui.com/system/\_](https://mui.com/system/basics/)
- MUI X:
  - Data grid: [https://mui.com/x/react-data-grid/\_](https://mui.com/x/react-data-grid/)
  - Date and time pickers: [https://mui.com/x/react-date-pickers/\_](https://mui.com/x/react-date-pickers/getting-started/)

## What do I gain?

## Improved search experience

Along with the documentation restructuring, the search experience has also been completely revamped.
This is a huge improvement especially for users of MUI Base and MUI X, who can now find exactly what they need much faster than before.

## Moving forward

This separation will become increasingly beneficial as each product grows, such as additional components in MUI X and MUI Base.

As we move forward working on [our second design system package](https://deploy-preview-30686--material-ui.netlify.app/experiments/), the separation will make it possible for us to build the documentation for each system using its default styles—so the docs themselves will serve as examples of their corresponding component libraries.

If you have any feedback or suggestions, we definitely want to hear from you.
Please open an issue in the [mui/material-ui repository on GitHub](https://github.com/mui/material-ui/issues), and be sure to start the **Title** with [docs].

Happy developing! 👩‍💻
