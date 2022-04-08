---
product: material-ui
title: React Grid（栅格）组件
components: Grid
githubLabel: 'component: Grid'
materialDesign: https://material.io/design/layout/understanding-layout.html
---

# Grid 栅格

<p class="description">Material Design 响应式布局的栅格可适应屏幕大小和方向，确保布局在不同尺寸之间的一致性。</p>

[Grid 栅格组件](https://material.io/design/layout/responsive-layout-grid.html) 能确保不同布局间的视觉层面的舒适感，同时在众多不同设计中保持灵活性。 Material Design 基于 12 列的网格布局来做到 UI 的响应式。

{{"component": "modules/components/ComponentLinkHeader.js"}}

> ⚠️ `栅格` 组件不要与承载大量数据的表格（data grid）进行混淆；这个组件更倾向于在布局中使用。 For a data grid head to [the `DataGrid` component](/x/react-data-grid/).

## 工作原理

栅格系统是通过 `Grid` 组件实现的：

- 它使用 [CSS 弹性盒子模块](https://www.w3.org/TR/css-flexbox-1/) 来做到高度灵活。
- 它有两种类型的布局： _containers_ ， _items_。
- 每项的宽度是按百分比设置的，所以它们的大小总是相对于它们的父元素流动。
- 子项目（items）使用内边距来保持和其他块（items）的间距。
- 其中五个断点可供使用：xs，sm，md，lg 和 xl。
- Integer values can be given to each breakpoint, indicating how many of the 12 available columns are occupied by the component when the viewport width satisfies the [breakpoint constraints](/material-ui/customization/breakpoints/#default-breakpoints).

若你对 **flexbox 不太熟悉**，我们建议你阅读 [CSS-Tricks flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 手册。

## Fluid grids 流式网格

流式网格可以通过列（column）来缩放和调整内容的大小。 在使用流式网格布局时，可以通过断点来决定该布局是否需要大幅改变。

### 基本栅格

每一列的宽度是 1 到 12 之间的整数值；这些宽度应用于任何断点，且表明了组件占用多少列。

你可以给定一个断点值来应用于比它更宽的所有其他断点（除非被覆盖，你可以在本页的后半部分了解被覆盖后的行为）。 例如，无论组件的大小如何，`xs={12}` 都会占据整个视口的宽度。

{{"demo": "BasicGrid.js", "bg": true}}

### 有断点的栅格

组件可能会定义多种宽度，用来根据事先定义的断点来改变其宽度。 那么它会覆盖给较小断点指定的宽度值。

For example, `xs={12} sm={6}` sizes a component to occupy half of the viewport width (6 columns) when viewport width is [600 or more pixels](/material-ui/customization/breakpoints/#default-breakpoints). 对于较小的视口，该组件将填充所有 12 个可用的列。

{{"demo": "FullWidthGrid.js", "bg": true}}

## Spacing 间距

要控制子组件之间的空间，请使用 `spacing` 属性。 间距值可以是任何数字（包括浮点数）和字符串。 The prop is converted into a CSS property using the [`theme.spacing()`](/material-ui/customization/spacing/) helper.

{{"demo": "SpacingGrid.js", "bg": true}}

### 行、列间距

`rowSpacing` 和 `columnSpacing` 属性允许独立指定行和列间距。 It's similar to the `row-gap` and `column-gap` properties of [CSS Grid](/system/grid/#row-gap-amp-column-gap).

{{"demo": "RowAndColumnSpacing.js", "bg": true}}

## 响应式的值

您可以根据活动的断点切换属性的值。 例如，我们可以实现 Material Design [“推荐”](https://material.io/design/layout/responsive-layout-grid.html)的响应式布局。

{{"demo": "ResponsiveGrid.js", "bg": true}}

下列属性支持响应式的值：

- `columns`
- `columnSpacing`
- `direction`
- `rowSpacing`
- `spacing`
- 系统中的所有[其它属性](#system-props)

> ⚠️ 当使用响应式的 `column` 属性时，每个网格项需要其对应的断点。 例如，下面这种做法是行不通的。 网格项丢失了 `md` 的值：
> 
> ```jsx
> <Grid container columns={{ xs: 4, md: 12 }}>
>    <Grid item xs={2} />
> > </Grid>
> ```

## 交互式

下面是一个交互式的演示，你也可以探索不同设置下的视觉结果：

{{"demo": "InteractiveGrid.js", "hideToolbar": true, "bg": true}}

## 自适应布局

自适应布局可以让 _子项（items）_ 之间平均地利用空间。 这也意味着你可以显式设置一个 _子项（item）_ 的宽度，而使其他项的大小根据其宽度自动进行调整。

{{"demo": "AutoGrid.js", "bg": true}}

### 负边距

Set one of the size breakpoint props to `"auto"` instead of `true` / a `number` to size a column based on the natural width of its content.

{{"demo": "VariableWidthGrid.js", "bg": true}}

## 复杂的栅格

以下演示不遵循 Material Design 指南，但它展示了如何使用网格来构建复杂的布局。

{{"demo": "ComplexGrid.js", "bg": true}}

## 嵌套栅格

`container` 和 `item` 的属性是基于两个独立的布尔值； 它们可以组合在一起，以允许 Grid 组件既是弹性容器又是子容器。

> 一个 flex **容器** 是通过将 `flex` 或 `inline-flex`的计算显示赋予给一个元素而生成的。 Flex 容器的流入子容器称为 flex **items**， 它们使用 flex 布局模型进行布局。

https://www.w3.org/TR/css-flexbox-1/#box-model

{{"demo": "NestedGrid.js", "bg": true}}

⚠️ 给 Flex 容器、Flex 子项以及同时带有间距的 Grid 元素定义一个显式宽度会导致意外的行为，需要避免这样做：

```jsx
<Grid spacing={1} container item xs={12}>
```

如果你需要这样做，那么请移出其中的一个属性。

## 列

你可以使用 `columns` 属性来更改默认列数（12）。

{{"demo": "ColumnsGrid.js", "bg": true}}

## 设计局限

### 负边距

项目之间的边距以负边距的形式来实现。 这样做的话可能会产生意料之外的结果。 例如，要应用背景颜色，您需要应用 `display: flex;` 到父布局。

### white-space: nowrap;

弹性布局元素的默认属性值为 `min-width：auto`。 当子元素使用 `white-space: nowrap;`时会出现布局冲突。 您可以从以下内容看到这个问题：

```jsx
<Grid item xs>
  <Typography noWrap>
```

为了使项留在容器内，您需要设置 `min-width: 0`。 在实际操作中，你可以设置 `zeroMinWidth` 属性来实现它：

```jsx
<Grid item xs zeroMinWidth>
  <Typography noWrap>
```

{{"demo": "AutoGridNoWrap.js", "bg": true}}

### direction: column | column-reverse

`direction="column"` 和 `direction="column-reverse"` 的容器**不支持**和断点有关的 `xs`, `sm`, `md`, `lg`，以及 `xl` 这几个属性。

它们定义组件用于某个断点的网格数量。 它们旨在使用 `flex-basis` 在 `row` 容器中控制 **width**，但它们会影响 `column` 容器的高度。 如果使用，这些属性可能会对 `Grid` 项目元素的高度产生不良影响。

## CSS 栅格布局

`Grid` 组件在内部使用 CSS flexbox。 但如下文所述，您也可以使用 [系统（system）](/system/grid/)和 CSS 网格来轻松地布局您的页面。

{{"demo": "CSSGrid.js", "bg": true}}

## 系统属性

作为一个 CSS 实用组件, `Grid` 支持所有 [`system`](/system/properties/) 属性。 您可以直接在组件上使用它们作为 props。 例如您想定义  padding 时：

```jsx
<Grid item p={2}>
```
