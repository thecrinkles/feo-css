---
layout: base.njk
title: Global
order: 4
key: global
---

The **global** layer is feo.css' baseline: a modern reset plus sensible defaults on bare HTML elements. It is what makes feo.css usable without a single class — write plain markup and it already looks reasonable. Everything here is styled with `:where()`, so every rule has **zero specificity** and is trivially overridden by your own [tokens](/tokens), layouts, components, and utilities further up the cascade.

```css
@layer tokens, global, layout, components, utilities;
/*             ^^^^^^ reset.css + global.css live here */
```

Because it reads from the `tokens` layer below it, anything you define there (fonts, colors, sizing) flows into these defaults automatically.

## Reset

A light, opinionated reset applied before any element styling.

<div class="scroll">
<table>
  <thead>
    <tr><th>Rule</th><th>Effect</th></tr>
  </thead>
  <tbody>
    <tr><td><code>box-sizing: border-box</code></td><td>On every element and pseudo-element.</td></tr>
    <tr><td><code>margin: 0</code></td><td>Removes default margins from all elements (except replaced media like <code>img</code>/<code>svg</code>).</td></tr>
    <tr><td><code>ul, ol</code></td><td>List styles and inline padding removed.</td></tr>
    <tr><td><code>img, picture, svg</code></td><td><code>display: block</code>, fluid up to 100% of their container, with intrinsic height preserved.</td></tr>
    <tr><td><code>input, button, textarea, select</code></td><td>Inherit <code>font-family</code> and <code>font-size</code> instead of the UA defaults.</td></tr>
    <tr><td>Focus handling</td><td>Outlines are removed for mouse users and restored as a <code>1px solid currentColor</code> ring for <code>:focus-visible</code> (keyboard) users.</td></tr>
    <tr><td><code>[hidden]</code> / <code>[tabindex="-1"]</code></td><td><code>[hidden]</code> gets <code>display: none</code> (see <em>Overriding</em> below); <code>[tabindex="-1"]</code> loses its outline.</td></tr>
  </tbody>
</table>
</div>

## Element defaults

The `global.css` baseline styles the elements you use on every page.

- **Document** — `color-scheme: light dark` (so it respects the user's theme), horizontal overflow hidden, smooth scrolling on `:focus-within`, `hanging-punctuation`, and `interpolate-size: allow-keywords` (enabling animation to/from keyword sizes) when motion is allowed.
- **Body** — `min-block-size: 100dvh`, a `20rem` minimum width, `system-ui` font stack, `font-size: 1rem`, `line-height: 1.5`, and antialiased text rendering.
- **Headings** — `h1`–`h3` are bold and sized on a `1.25` modular scale via `pow()` (`h1` = `1rem × 1.25³`, `h2` = `²`, `h3` = `¹`). Headings and interactive elements get a tighter `1.2` line-height, and `h1`–`h4` use `text-wrap: balance`.
- **Links** — unclassed links (`a:not([class])`) inherit their color, with a smart underline (`text-underline-offset`, ink-skipping, and a half-transparent decoration color).
- **Code** — `code` uses a monospace stack; inline code stays on one line, while `pre > code` scrolls horizontally with a `0.75rem` padding and `tab-size: 2`.
- **Cursors** — `:disabled`/`[disabled]` show `not-allowed`; `[aria-controls]` shows `pointer`.
- **Dialogs** — when a `<dialog open>` is present, background scrolling is locked.

## Progressive & accessible defaults

- **View transitions** — cross-document view transitions are enabled (`@view-transition { navigation: auto }`) where supported.
- **Reduced motion** — under `prefers-reduced-motion: reduce`, animations and transitions are near-instant, smooth scrolling is disabled, and view transitions are turned off.

## Overriding

Every rule uses `:where()` (specificity `0,0,0`), so you never need `!important` or high-specificity selectors to change a default — a single class, or a rule in a higher layer, always wins. Set your own values through the [tokens](/tokens) layer to reskin the baseline project-wide.

The same goes for `[hidden]`: a layout class on the element sets `display` from a later layer, so `<div class="flex" hidden>` stays visible. Toggle `hidden` on a wrapper instead, or restore the behavior in your own `global` layer:

```css
@layer global {
  [hidden] {
    display: none !important;
  }
}
```
