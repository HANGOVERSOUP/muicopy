---
product: material-ui
title: React Modal（模态框）组件
components: Modal
githubLabel: 'component: modal'
waiAria: 'https://www.w3.org/TR/wai-aria-practices/#dialog_modal'
unstyled: /base/react-modal/
---

# Modal 模态框组件

<p class="description">模态框组件可以用来快速创建对话框、弹出窗口，灯箱等任何你所需的组件。</p>

组件会在背景组件上层渲染其 `children` 节点。 `模态框`提供了一些重要的功能：

- 💄 管理了当一次只显示一个不能满足时的模态框堆叠。
- 🔐 创建了一个背景暗化组件，这样能禁用在模态框之外的交互。
- 🔐 在模态框打开时禁用页面内容的滚动。
- ♿️ 它妥善管理焦点；移动到模态内容，并保持内容一直存在直到模态框关闭。
- ♿️ 自动添加适当的 ARIA 角色。

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

> **术语注释**。 “模态框”（Modal）这个词有时也被用来指代“对话框”，但是这种用法属于误用。 模态框的窗口描述了 UI 的一部分。 如果一个元素[阻挡了用户与应用的其它部分的互动](https://en.wikipedia.org/wiki/Modal_window)，这个元素就是模态的。

当你创建一个模态对话框时，使用[对话框（Dialog）](/components/dialogs/)组件比直接使用模态框更佳。 以下的组件将将模态框作为一个低级别的组件运用：

- [Dialog](/components/dialogs/)
- [Drawer（抽屉）](/components/drawers/)
- [Menu](/components/menus/)
- [弹出框 (Popover)](/components/popover/)

## Basic modal

{{"demo": "BasicModal.js"}}

请注意，您可以通过 `outline: 0` 属性来禁用模态框的边缘（通常为蓝色或金色）。

## Nested modal

Modals can be nested, for example a select within a dialog, but stacking of more than two modals, or any two modals with a backdrop is discouraged.

{{"demo": "NestedModal.js"}}

## Transitions

The open/close state of the modal can be animated with a transition component. This component should respect the following conditions:

- Be a direct child descendent of the modal.
- Have an `in` prop. This corresponds to the open/close state.
- Call the `onEnter` callback prop when the enter transition starts.
- Call the `onExited` callback prop when the exit transition is completed. These two callbacks allow the modal to unmount the child content when closed and fully transitioned.

Modal has built-in support for [react-transition-group](https://github.com/reactjs/react-transition-group).

{{"demo": "TransitionsModal.js"}}

Alternatively, you can use [react-spring](https://github.com/pmndrs/react-spring).

{{"demo": "SpringModal.js"}}

## Performance

The content of modal is unmounted when closed. If you need to make the content available to search engines or render expensive component trees inside your modal while optimizing for interaction responsiveness it might be a good idea to change this default behavior by enabling the `keepMounted` prop:

```jsx
<Modal keepMounted />
```

{{"demo": "KeepMountedModal.js", "defaultCodeOpen": false}}

As with any performance optimization, this is not a silver bullet. Be sure to identify bottlenecks first, and then try out these optimization strategies.

## Server-side modal

React [doesn't support](https://github.com/facebook/react/issues/13097) the [`createPortal()`](https://reactjs.org/docs/portals.html) API on the server. In order to display the modal, you need to disable the portal feature with the `disablePortal` prop:

{{"demo": "ServerModal.js"}}

## Limitations

### 焦点陷阱

The modal moves the focus back to the body of the component if the focus tries to escape it.

This is done for accessibility purposes. However, it might create issues. In the event the users need to interact with another part of the page, e.g. with a chatbot window, you can disable the behavior:

```jsx
<Modal disableEnforceFocus />
```

## Accessibility

(WAI-ARIA: https://www.w3.org/TR/wai-aria-practices/#dialog_modal)

- Be sure to add `aria-labelledby="id..."`, referencing the modal title, to the `Modal`. Additionally, you may give a description of your modal with the `aria-describedby="id..."` prop on the `Modal`.

  ```jsx
  <Modal aria-labelledby="modal-title" aria-describedby="modal-description">
    <h2 id="modal-title">My Title</h2>
    <p id="modal-description">My Description</p>
  </Modal>
  ```

- The [WAI-ARIA authoring practices](https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/dialog.html) can help you set the initial focus on the most relevant element, based on your modal content.
- Keep in mind that a "modal window" overlays on either the primary window or another modal window. Windows under a modal are **inert**. That is, users cannot interact with content outside an active modal window. This might create [conflicting behaviors](#focus-trap).
