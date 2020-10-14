---
description: An update on our mission for Q3 2020.
---

# Q3 2020 Update

Olivier Tassinari. October 14, 2020.

This update covers our progress over the last three months, and what we aim to achieve in the coming months.

## Product

Here are the most significant improvements since June 2020. The was a dense quarter!

- 🚧 We have started the quarter with a first pre-release [v5.0.0-alpha.1](https://github.com/mui-org/material-ui/releases?after=v5.0.0-alpha.1) of the next major iteration of the library.
  We have done eleven more pre-releases since then. During the alpha development stage of version 5, we are focusing on making the planned breaking changes as well as developing the new features.
  On the breaking changes side, we have almost done half of the changes that we had planned.
- 🧪 We have promoted 7 components from the lab to the core: Alert, Autocomplete, Pagination, Rating, Skeleton, SpeedDial, and ToggleButton.
  Thank you for all your feedback on these components.
  While we still plan a couple of breaking changes on them, we are confident they reach the level of quality as the other core components.
- 👮 We have introduced a new component in the lab, the [TrapFocus](https://next.material-ui.com/components/trap-focus/). It manages focus for its descendants. This is useful when implementing overlays such as modal dialogs, which should not allow focus to escape while open:

  <video autoplay muted loop style="max-height: 416px; margin-bottom: 24px;">
    <source src="/static/blog/2020-q3-update/trap-focus.mp4" type="video/mp4" />
  </video>

- ⚛️ We have prepared the support for the upcoming release of [React v17](https://reactjs.org/blog/2020/08/10/react-v17-rc.html). Most of the work was about better handling events and updating our test infrastructure to run the whole test suite with the _latest_ and _next_ version of React.<br />We have also improved `StrictMode` support. The last standing issues are being addressed with our work on the styled engine, more on that later in the post.
- 💅 We have introduced a new dynamic variant API. This API allows developers to add new variants on the Material-UI's components right from the theme, without having to wrap the components. For instance with the Button:

  ```tsx
  // Define the style that should be applied, for specific props.
  const theme = createMuiTheme({
    components: {
      MuiButton: {
        variants: [
          {
            props: { variant: 'dashed', color: 'secondary' },
            styles: {
              border: `4px dashed ${red[500]}`,
            },
          },
        ],
      },
    },
  });

  // Retain type safety.
  declare module '@material-ui/core/Button/Button' {
    interface ButtonPropsVariantOverrides {
      dashed: true;
    }
  }

  // Enjoy!
  <Button variant="dashed" />;
  ```

  This change is part of a direction to ease the implementation of custom design systems.
  Note that the API not only allows to match a single prop but also a combination of props.
  This is especially interesting when different variants try to modify the same CSS property.

  Hopefully, we will be able to better support the upcoming variant feature [coming in Figma](https://help.figma.com/hc/en-us/articles/360055471353-Prepare-for-Variants) with this API.

- ⚡️ We have release a first alpha version of the [data grid component](/components/data-grid/).<br />
  We have announced our interest in building the component [a year ago](/blog/september-2019-update/#our-roadmap-intent-for-october). While I could have implemented a simple version and release it a month later, it wouldn't have put us in the right direction for the years to come. We aim to deliver the best in class pure React data grid.
  This ambition requires a double licensing model. The component is available under an MIT license for the features that can be relatively easily implemented and that can be sustained with an open-source model, as well as a paid commercial license for the most advanced features.
  <br />So instead of building it myself, we have spent time finding an expert in the field. It has led us to open a new job position and a few months later, [Damien Tassone](/blog/spotlight-damien-tassone/) is now leading the work on the component.

  <a href="/components/data-grid/"><img src="/static/blog/2020-q3-update/data-grid.png" alt="" style="width: 829px; margin-bottom: 8px;" /></a>

  <p class="blog-description">100,000 rows</p>

  After 6 months of development since the initial commit (March 15th, 2020), you can start using the component, it targets v4!

- ⚡️ The data grid effort has led to the introduction of a new repository: [_mui-org/material-ui-x_](https://github.com/mui-org/material-ui-x). This is the repository that will host all the future commercial components, all the components that we can't sustain with the open-source model. Material-UI X is our next shoot at scaling Material-UI (as a company and a comprehensive React library of components). While we have an existing sustainability model that can support, in long term, up to 10 people full-time. We are eager to push it by one order of magnitude.
- 🛠 We have migrated parts of the codebase to TypeScript.<br />
  We had to work on the code infrastructure of _mui-org/material-ui_ to prepare to host the date picker components that are written in TypeScript inside the lab (coming from _mui-org/material-ui-pickers_ that we will archive once we can).

  <img src="/static/blog/2020-q3-update/typescript-mui.png" alt="" style="width: 299px; margin-bottom: 8px;" />

  <p class="blog-description">Material-UI's repository</p>

  On the other hand, we have started using TypeScript from day one on _mui-org/material-ui-x_.

  <img src="/static/blog/2020-q3-update/typescript-mui-x.png" alt="" style="width: 299px; margin-bottom: 8px;" />

  <p class="blog-description">Material-UI X's repository</p>

- 🐙 We have migrated large parts of the test suite to react-testing-library.<br>
  15 months ago, we introduced the very [first test](https://github.com/mui-org/material-ui/pull/15732) using the library (to replace enzyme). Last month, react-testing-library had [more downloads](https://npm-stat.com/charts.html?package=enzyme&package=%40testing-library%2Freact&from=2019-10-10&to=2020-10-10) than enzyme!

  <img src="/static/blog/2020-q3-update/react-testing-library.png" alt="" style="width: 640px; margin-bottom: 40px; margin-top: 24px;" />

- 💅 We have done the first iteration on the unstyled components of v5.<br />You can find a [new version](https://next.material-ui.com/components/slider-styled/#UnstyledSlider.tsx) of the slider in the lab without any styles.
  The unstyled component weighs [5.2 kB gzipped](https://bundlephobia.com/result?p=@material-ui/lab@5.0.0-alpha.12), compared with 26 kB for the styled version when used standalone. The component is best suited for use when you want to fully customize the look without reimplementing the JavaScript and accessibility logic.<br />
  We are also pushing in this direction to address a concern we hear from large enterprises.
  They want to be able to go one layer down in the abstraction, to gain more control.

  ```jsx
  import SliderUnstyled from '@material-ui/lab/SliderUnstyled';
  ```

  Note that we have experimented with headless components (hooks only) in the past. For instance, you can leverage the [useAutocomplete](/components/autocomplete/#useautocomplete), and [usePagination](/components/pagination/#usepagination) hooks. However, we are pushing with unstyled first as a required step for the next item: ⬇️.

- 👩‍🎨 We have done the first iteration on the new styling solution of v5.<br />
  You can find a [new version](https://next.material-ui.com/components/slider-styled/) of the slider in the lab powered by [emotion](https://emotion.sh/docs/introduction).<br />
  If you are already using styled-components in your application, you can swap emotion for styled-components 💅. Check this [CodeSandbox](https://codesandbox.io/s/sliderstyled-with-styled-components-forked-olc27?file=/package.json) or [CRA](https://github.com/mui-org/material-ui/blob/next/examples/create-react-app-with-styled-components/) for a demo. It relies on aliases to prevent any bundle size overhead.<br />
  The new styling solution saves 2kB+ gzipped in the bundle compared to JSS, and about 14 kB gzipped if you were already using styled-components or emotion.<br />
  Last but not least, the change allows us to take advantage of dynamic style props. We will use them for dynamic color props, variant props, and new style props available in the core components.

  <img src="/static/blog/2020-q3-update/emotion.png" alt="" style="width: 329px;" />

  <p class="blog-description">Slider powered by emotion</p>

  <img src="/static/blog/2020-q3-update/styled-components.png" alt="" style="width: 323px;" />

  <p class="blog-description">Slider powered by styled-components</p>

- ♿︎ We have kept investing in accessibility, we have fixed [13 bugs](https://github.com/mui-org/material-ui/pulls?q=is%3Apr+label%3Aaccessibility+is%3Aclosed+sort%3Aupdated-desc).
- 🗓 We have introduced public quarterly roadmaps, both for [community](https://github.com/mui-org/material-ui/projects) and [enterprise](https://github.com/mui-org/material-ui-x/projects).

## Company

We are thrilled to welcome two new full-time developers on Material-UI:

- [Marija Najdova](https://github.com/mnajdova). Marija is coming from the Fluent-UI's React team at Microsoft. She's consolidating the community team. You can learn more about her in the [introduction blog post](/blog/marija-najdova-joining/).

  <img src="https://avatars3.githubusercontent.com/u/4512430?s=320" alt="marija" style="max-width: 160px; margin: unset; margin-bottom: 24px; border-radius: 2px;" />

- [Danail Hadjiatanasov](https://github.com/DanailH). Danail is coming from the Fintech industry. He's consolidating the enterprise team, he's helping Damien push the data grid further.

  <img src="https://avatars3.githubusercontent.com/u/5858539?s=320" alt="marija" style="max-width: 160px; margin: unset; margin-bottom: 24px; border-radius: 2px;" />

### Growth between Q2 2020 and Q3 2020

- 📦 From 5.1M to 6.0M downloads per month on npm.<br />
  While React is growing, we are also growing inside its ecosystem.

  <img src="/static/blog/2020-q3-update/react-share.png" alt="" style="width: 588px; margin-bottom: 16px;" />

  <p class="blog-description">% of download relative to react-dom</p>

- ⭐️ From 59.0k to 61.6k stars, leave us yours [🌟](https://github.com/mui-org/material-ui).
- 👨‍👩‍👧‍👦 From 1,825 to 1,934 contributors on GitHub. We add on average 1 new contributor every day.
- 🏢 We have welcomed two new full-time developers on Material-UI.

## Our roadmap intent for Q4 2020

We'll do our best, no guarantee!

### Community

- 🗓 Execute on all the items of the [public roadmap](https://github.com/mui-org/material-ui/projects/25).
- ❓ Please upvote [GitHub issues](https://github.com/mui-org/material-ui/issues) if you want us to focus on a specific problem. The number of 👍 helps us to prioritize.

### Enterprise

- 👩‍🎨 Complete the collaboration we have started with a design agency last quarter: do the branding of the company, redo the homepage, and do the marketing pages of the enterprise package.
- 🗓 Execute on all the items of the [public roadmap](https://github.com/mui-org/material-ui-x/projects/1).
- ❓ Please upvote [GitHub issues](https://github.com/mui-org/material-ui-x/issues) if you want us to focus on a specific problem. The number of 👍 helps us to prioritize.

### Company

These are objectives, no guarantees:

- 🏢 We might hire a designer that has coding skills. One of the objectives would be to solve [#22485](https://github.com/mui-org/material-ui/issues/22485).
- 🏝 We have put the company-wide team retreat on hold because of the resumption of COVID-19 cases.
  Hopefully, we will be able to resume it in Q2 2021.
