---
layout: base.njk
title: Principles
order: 2
key: principles
description: "The Feo.css architecture: cascade layers, where each style belongs, the shared --layout-* API, choosing a layout, anti-patterns, and gotchas."
---

Feo.css is a small CSS library built on a layered, token-driven architecture. It provides the **structure**: a reset, defaults for bare HTML elements, layout primitives, and a few utilities. It leaves the **skin** (tokens, colors, typography, and components) to your project. Read this page before writing CSS with Feo.css. It explains the architecture, where each style belongs, the API every layout shares, and the mistakes to avoid.

## The layers

Feo.css places every rule in one of five [cascade layers](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer). A later layer always wins over an earlier one, regardless of specificity.

```css
@layer tokens, global, layout, components, utilities;
```

<div class="scroll">

| Layer        | What Feo.css ships                                                          | What you add                                               |
| ------------ | --------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `tokens`     | Nothing                                                                     | Primitive and semantic tokens, `@font-face` rules          |
| `global`     | A reset and defaults for bare elements, at zero specificity via `:where()`  | Project-wide element styles that read your semantic tokens |
| `layout`     | Layout primitives (`.flex`, `.sidebar`, …) and their `.--*` class utilities | New structural patterns only, which is rarely needed       |
| `components` | `.hover-group`                                                              | Your UI components                                         |
| `utilities`  | Single-purpose helpers (`.visually-hidden`, `.read-more`, …)                | Helpers that expose your semantic tokens                   |

</div>

1. **Tokens**: the single source of truth for visual values, organised by scope.
   1. _Primitives_: raw values with no opinion or intent. They are never the semantic language of the project.
   2. _Semantic_: intent-based aliases of primitives that express project meaning. Global styles, components, and utilities only read this tier.
2. **Global** (`reset.css` + `global.css`): project-wide styles on bare HTML elements; the baseline everything inherits from.
3. **Layout**: reusable spatial primitives that define how elements relate to each other, with no visual identity of their own.
4. **Components**: all UI components, from portable design system building blocks to project-specific compositions. Categorise them by use case and user intent, not by visual or mechanical similarity.
5. **Utilities**: single-purpose classes that do one small job. They may expose semantic tokens or encapsulate a small reusable pattern, but they must not bypass the architecture.

## Setting up

Declare the layer order first, then import Feo.css and your own files. Put every rule you write inside one of the layers: unlayered CSS beats all layers and bypasses the architecture.

```css
/* index.css */
@layer tokens, global, layout, components, utilities;

@import "https://unpkg.com/feo-css@beta/feo.min.css";

@import "tokens/custom-media.css"; /* @custom-media only works outside layers */
@import "tokens/fonts.css" layer(tokens);
@import "tokens/primitives.css" layer(tokens);
@import "tokens/semantic.css" layer(tokens);

@import "global.css" layer(global);

@import "components/button.css" layer(components);
```

Feo.css sets no colors and ships no size scale. Define them in the `tokens` layer (see [Tokens](/tokens/)) and apply them to bare elements in your `global` layer.

## Where does a style go?

Solve problems with the layout primitives and existing utilities first. When that is not enough, go down this list and stop at the first match.

1. Is it a raw or semantic value (color, size, font)? Make it a token in `tokens`.
2. Is it a default rule for a plain HTML element? Put it in `global`.
3. Is it a reusable structural pattern with no visual identity? Put it in `layout`.
4. Is it a reusable UI element with context, state, or identity? Put it in `components`.
5. Is it a tiny helper that does one job without exposing raw primitive values? Put it in `utilities`.
6. Does a specific implementation need a small exception to an existing layout or component?
   - If a single property of its API should change, use a class utility.
   - If multiple properties of its API should change, use a `data-*` selector.
7. If no dedicated place fits, create a `specific/` directory and put it there.

## Configuring layouts

Layouts have no visual identity and no built-in values. Each one exposes its configuration as `--layout-*` custom properties with a neutral default (usually `0`). Set them inline for a one-off, or in a class for reuse, and prefer your semantic tokens as values.

```html
<ul class="cluster" style="--layout-gap: var(--space-s)">
  …
</ul>

<div class="sidebar --left" style="--layout-gap: var(--space-l); --layout-threshold: 15rem">
  <main>…</main>
  <aside>…</aside>
</div>
```

The layouts share one vocabulary of properties:

<div class="scroll">

| Property               | Controls                                                          | Used by                                                                              |
| ---------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `--layout-gap`         | Space between children                                            | All layouts except `.center`, `.pile`, `.ratio`, and `.scroll`                       |
| `--layout-threshold`   | The key width: a switch point, a column width, or a maximum width | `.center`, `.sidebar`, `.switcher`, `.tiles`                                         |
| `--layout-direction`   | `flex-direction`                                                  | `.equal`, `.flex`, `.repel`, `.switcher`                                             |
| `--layout-items`       | `align-items` (cross axis)                                        | `.cluster`, `.equal`, `.flex`, `.pile`, `.repel`, `.sidebar`, `.switcher`, `.scroll` |
| `--layout-justify`     | `justify-content` (main axis)                                     | `.cluster`, `.equal`, `.flex`, `.sidebar`, `.switcher`                               |
| `--layout-amount`      | The number of columns                                             | `.grid`                                                                              |
| `--layout-inline-size` | The minimum size of the flexible column before it wraps           | `.sidebar`                                                                           |
| `--ratio`              | `aspect-ratio`                                                    | `.ratio`                                                                             |

</div>

Class utilities (prefixed with `.--`) set one property of a layout API, and combine with the layout on the same element: `class="flex --column --center"`.

- `.--row`, `.--column` set `--layout-direction`.
- `.--start`, `.--center`, `.--end`, `.--stretch` set `--layout-items`.
- `.--justify-start`, `.--justify-center`, `.--justify-end`, `.--justify-between`, `.--justify-around` set `--layout-justify`.
- `.--amount-2` … `.--amount-6` set `--layout-amount`, and `.--ratio-1x1`, `.--ratio-16x9`, `.--ratio-2x1`, `.--ratio-3x2` set `--ratio`.
- Layout-specific modifiers: `.--left` and `.--right` (sidebar), `.--fixed` (switcher), `.--fit` (tiles), `.--wrap` (flex), and `.--snappable` (scroll).

When an element carries both a component and a layout, separate the groups with a `|` for readability: `class="card | flex --column"`.

## Choosing a layout

<div class="scroll">

| You need                                              | Use                                                         |
| ----------------------------------------------------- | ----------------------------------------------------------- |
| Content centered with a maximum width                 | [`.center`](/layout/center/) with `--layout-threshold`      |
| Vertical rhythm between flowing content, like prose   | [`.flow`](/layout/flow/)                                    |
| A row or column of items with a gap                   | [`.flex`](/layout/flex/)                                    |
| Items that wrap onto new lines, like tags             | [`.cluster`](/layout/cluster/)                              |
| Items pushed to opposite ends, like a header bar      | [`.repel`](/layout/repel/)                                  |
| Children of equal size in one row                     | [`.equal`](/layout/equal/)                                  |
| A fixed-width side column next to a flexible column   | [`.sidebar`](/layout/sidebar/) with `.--left` or `.--right` |
| A row that stacks all at once below a width           | [`.switcher`](/layout/switcher/)                            |
| A responsive grid of cards with a minimum width       | [`.tiles`](/layout/tiles/)                                  |
| A fixed number of columns                             | [`.grid`](/layout/grid/) with `--layout-amount`             |
| A header, footer, and a main area that fills the rest | [`.pancake`](/layout/pancake/)                              |
| Children stacked on top of each other                 | [`.pile`](/layout/pile/)                                    |
| A fixed aspect ratio                                  | [`.ratio`](/layout/aspect-ratio/) with `.--ratio-*`         |
| Horizontal scrolling                                  | [`.scroll`](/layout/scroll/)                                |

</div>

## Guiding principles

1. How elements relate spatially to each other is separated from visual identity, separating structure from skin. No component ever manages its own positioning relative to siblings.
2. The wider the decision applies, the higher up the stack it lives. Style at the highest appropriate level and let values flow downward naturally. Only introduce component-level styles when they differ from the global baseline.
3. Global CSS styles what something _is_. Components style what something _is in a context_. Utilities style one small behavior or one semantic decision, not a raw primitive step.
4. Design tokens have three tiers: primitives, semantic, and component-level tokens. Each tier only uses tokens from the previous tier.
5. Component-specific tokens are colocated with components in the component API. A component property is introduced in the API when it is genuinely specific to that component.
6. A component API declares what can be customised, keeping the internal CSS an implementation detail that consumers never need to touch.
7. Public CSS APIs should use explicit, opt-in selectors. Avoid selector patterns that create accidental behavior through naming coincidence.

## Naming conventions

- Primitive tokens are prefixed with `--p-*`.
- Semantic tokens on a scale (e.g. sizing) are named from a base and work up and down. `--size-0` is the default font-size of the `body`, `--size--1` is one step smaller, and `--size-1` is one step bigger.
- Layout APIs use `--layout-*` properties. Component APIs prefix their properties with the component name, like `--hover-grow` and `--hover-opacity` on `.hover-group`.
- Class utilities control one property of a layout or component API and are named `.--<name>`.

## Anti-patterns

- Exposing primitive token steps directly in application markup
- Adding visual identity to layout primitives
- Adding component styling to utilities
- Using utilities or margins to solve sibling spacing where a layout primitive should own it
- Writing unlayered CSS, which silently overrides every layer
- Treating the starter library as the finished design system

```html
<!-- Don't: children space themselves, with raw values -->
<article class="card">
  <h2 style="margin-bottom: 12px">Title</h2>
  <p>Text</p>
</article>

<!-- Do: a layout owns the spacing, with a semantic token -->
<article class="card | flex --column" style="--layout-gap: var(--space-s)">
  <h2>Title</h2>
  <p>Text</p>
</article>
```

```css
/* Don't: visual identity on a layout primitive */
@layer layout {
  .cluster {
    background: var(--surface-1);
  }
}

/* Do: a component carries the identity, the layout the structure */
@layer components {
  .tag-list {
    background: var(--surface-1);
  }
}
```

## Gotchas

- **Layouts only style their direct children.** Wrap content that should move as one unit in a single element.
- **`hidden` does not hide an element with a layout class.** The reset's `[hidden]` rule lives in `global`, and the layout's `display` wins from a later layer. Toggle `hidden` on a wrapper, or add `[hidden] { display: none !important; }` to your `global` layer.
- **Global rules have zero specificity.** Any rule in your own `global` layer overrides them without `!important`.

## Project structure

When implementing this architecture, use the project structure below. Existing frameworks can fill any of the layers: Feo.css covers the `global`, `layout`, and `utilities` layers, and a framework like [Tailwind](https://tailwindcss.com) could fill the `utilities` layer.

```
styles/
├── components/
│   ├── primitives/       ← elemental building blocks
│   ├── containers/       ← e.g. wrappers
│   └── .../
│
├── layout/
│
├── tokens/
│   ├── custom-media.css  ← @custom-media rules
│   ├── fonts.css         ← loading of local fonts
│   ├── primitives.css
│   └── semantic.css
│
├── utilities/
│
├── global.css
└── index.css             ← layer order and imports (see Setting up)
```

## Progressive enhancement

If a modern CSS feature improves an existing utility or pattern but is not yet broadly supported:

- Keep a stable fallback.
- Add the improved behavior behind `@supports`.
- Keep the public API consistent across both paths.
- Document any important differences in behavior or value scope.

`.counted` and `.indexed` follow this pattern: they use `sibling-count()` and `sibling-index()` where supported, with `:nth-child()` fallbacks.
