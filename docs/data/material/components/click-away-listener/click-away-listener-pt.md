---
product: material-ui
title: Componente React para Detectar clique fora
components: ClickAwayListener
githubLabel: 'component: ClickAwayListener'
---

# Observador de Clique (ClickAwayListener)

<p class="description">Detecta se um evento de clique ocorreu fora de um elemento. Ele ouve cliques que ocorrem em algum lugar no documento.</p>

- 📦 [992 B gzipped](/size-snapshot).
- ⚛️ Supports portals

[A paleta](/system/palette/) com funções de estilo.

## Exemplo

Por exemplo, se você precisar ocultar um menu quando as pessoas clicarem em qualquer outro lugar da sua página:

{{"demo": "ClickAway.js"}}

Observe que o componente aceita apenas um elemento filho. You can find a more advanced demo on the [Menu documentation section](/material-ui/react-menu/#menulist-composition).

## Portal

The following demo uses [`Portal`](/material-ui/react-portal/) to render the dropdown into a new "subtree" outside of current DOM hierarchy.

{{"demo": "PortalClickAway.js"}}

## Eventos

Por padrão, o componente responde aos eventos de clique e de toque final (click + touch end). No entanto, você pode configurá-lo para responder aos eventos de mouse pressionado e toque inicial (mouse down + touch start).

{{"demo": "LeadingClickAway.js"}}

> ⚠️ Neste modo, apenas as interações na barra de rolagem do documento são ignoradas.

## Accessibility

By default `<ClickAwayListener />` will add an `onClick` handler to its children. This can result in e.g. screen readers announcing the children as clickable. However, the purpose of the `onClick` handler is not to make `children` interactive.

In order to prevent screen readers from marking non-interactive children as "clickable" add `role="presentation"` to the immediate children:

```tsx
<ClickAwayListener>
  <div role="presentation">
    <h1>non-interactive heading</h1>
  </div>
</ClickAwayListern>
```

Isso também é necessário para corrigir um estranho no NVDA ao usar o Firefox que impede o anúncio de mensagens de alerta (consulte [mui/material-ui#29080](https://github.com/mui/material-ui/issues/29080)).

## Unstyled

- 📦 [981 B gzipped](https://bundlephobia.com/package/@mui/base@latest)

As the component does not have any styles, it also comes with the Base package.

```js
import ClickAwayListener from '@mui/base/ClickAwayListener';
```
