---
product: base
title: Textarea Autosize React component
components: TextareaAutosize
githubLabel: 'component: TextareaAutosize'
packageName: '@mui/base'
---

# Textarea autosize

<p class="description">The TextareaAutosize component gives you a textarea HTML element that automatically adjusts its height to match the length of the content within.</p>

`TextareaAutosize` is a component that replaces the native `<textarea>` HTML element.

The height of the `TextareaAutosize` component automatically adjusts as a response to keyboard inputs and window resizing events.

## Basic usage

```js
import TextareaAutosize from '@mui/base/TextareaAutosize';
```

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

## Simple textarea

By default, an empty `TextareaAutosize` component renders as a single row:

{{"demo": "EmptyTextarea.js"}}

## Minimum height

Use the `minRows` prop to define the minimum height of the component:

{{"demo": "MinHeightTextarea.js"}}

## Maximum height

Use the `maxRows` prop to define the maximum height of the component:

{{"demo": "MaxHeightTextarea.js"}}

## Bundle size

📦 [1.5 kB gzipped](/size-snapshot/).
