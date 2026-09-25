---
layout: base.njk
title: Principles
order: 2
key: principles
description: "The Feo.css architecture: its cascade layers, the principles behind them, and where each style belongs."
---

Feo.css follows a layered, token-driven architecture. The goal of this architecture is to separate structure from visual identity, and create a CSS architecture that is predictable, scalable, and easy for both engineers and AI agents to extend without collapsing into ad hoc styling.

Feo.css provides the structure: a reset, sensible defaults for plain HTML, layout primitives, and a handful of utilities. The visual identity (your tokens, colors, and components) is left to your project.

## High-level architecture

The overall architecture follows a layered approach, built on CSS [`@layer`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@layer) rules. A later layer always wins over an earlier one, regardless of specificity.

1. **Tokens**: The single source of truth for visual values, organised by scope. Feo.css ships none; this layer is yours to fill (see [Tokens](/tokens/)).
   1. _Primitives_: Raw values with no opinion or intent. They are never the semantic language of the project.
   2. _Semantic_: Intent-based aliases of primitives that express project meaning. This is the project-owned token layer used by global styles, components, and optional project utilities.
2. **reset.css + global.css**: Project-wide styles applied to bare HTML elements using semantic tokens; the baseline everything inherits from.
3. **Layout**: Reusable spatial primitives that define how elements relate to each other, with no visual identity of their own. Each one is configured through `--layout-*` custom properties (see [Layout](/layout/)).
4. **Components**: All UI components, from generic and portable design system building blocks to project-specific compositions. Components are categorised by use case and user intent, not by visual or mechanical similarity.
5. **Utilities**: Single-purpose classes that do one small job. They may expose project semantic tokens or encapsulate small reusable patterns, but they must not bypass the architecture.

## Guiding principles

1. How elements relate spatially to each other is separated from visual identity, separating structure from skin. No component ever manages its own positioning relative to siblings.
2. The wider the decision applies, the higher up the stack it lives. Style at the highest appropriate level and let values flow downward naturally. Only introduce component-level styles when they differ from the global baseline.
3. Global CSS styles what something _is_. Components style what something _is in a context_. Utilities style one small behavior or one semantic decision, not a raw primitive step.
4. A three-tier approach is used for design tokens: primitives, semantic, and component-level tokens. Each layer only uses tokens from the previous layer.
5. Component-specific tokens are colocated with components in the component API. A component property is introduced in the API when it is genuinely specific to that component.
6. A component API declares what can be customised, keeping the internal CSS an implementation detail that consumers never need to touch.
7. Public CSS APIs should use explicit, opt-in selectors. Avoid selector patterns that create accidental behavior through naming coincidence.

## Project structure

When implementing this architecture or approach, it is advised to use the project structure as established below. It is possible to combine existing frameworks within various layers (e.g. use of Feo.css for several of the layers, or [tailwind](https://tailwindcss.com) as the utilities layer).

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
└── index.css
```

The `index.css` declares the layer order and imports all the files. Declare the order before anything else, and put every rule inside a layer: unlayered CSS overrides all of them.

```css
/* Example of index.css content */
@layer tokens, global, layout, components, utilities;

@import "https://unpkg.com/feo-css@beta/feo.min.css";

/** TOKEN LAYER */
@import "tokens/custom-media.css"; /* note: only works outside layers */
@import "tokens/fonts.css" layer(tokens);
@import "tokens/primitives.css" layer(tokens);
@import "tokens/semantic.css" layer(tokens);

/** GLOBAL */
@import "global.css" layer(global);

/** COMPONENTS */
@import "components/primitives/button.css" layer(components);
@import "components/primitives/icon.css" layer(components);
```

## Implementation guidelines

### Implementation order of styles

The key rule is “_solve problems with layout primitives and existing utilities first_”. If that is not enough, introduce new styles under the following rules.

1. Is this a default rule for plain HTML elements? Put it in `global.css`.
2. Is this a reusable structural pattern with no visual identity? Put it in `layout/`.
3. Is this a reusable UI element with context, state, or identity? Put it in `components/`.
4. Is this a tiny helper that does one job without exposing raw primitive values? Put it in `utilities/`.
5. If a specific implementation still needs a small exception from an existing class in `layout/` or `components/`, there are two options:
   - If a single property in the API should be adjusted, use a class utility.
   - If multiple properties in the API need to be adjusted, use a `data-*` selector.
6. If no dedicated place can be found for your style, create a `specific/` directory and place it there.

### Naming convention

Use the following naming convention rules:

- Primitive tokens should be prefixed with `--p-*`.
- Semantic tokens that are related on a scale (e.g. sizing) should have a name that relates to the system, starting from a base and work up and down. For instance, `--size-0` represents the default font-size of the `body`, `--size--1` is one step smaller, and `--size-1` is one step bigger.
- Layout properties are named `--layout-*`. Component properties are prefixed with the component name, like `--hover-opacity` for the `.hover-group`.
- Class utilities are classes that allow you to control one property from a component or layout API (i.e. a different class). These classes are named as `.--<class-util-name>`.

### Progressive enhancement

If a modern CSS feature improves an existing utility or pattern but is not yet broadly supported:

- Keep a stable fallback.
- Add the improved behavior behind `@supports`.
- Keep the public API consistent across both paths.
- Document any important differences in behavior or value scope.

### Anti-patterns

Avoid the following anti-patterns.

- Exposing primitive token steps directly in application markup
- Adding visual identity to layout primitives
- Adding component styling to utilities
- Using utilities to solve sibling spacing where a layout primitive should own it
- Writing CSS outside of a layer, which silently overrides the whole architecture
- Treating the starter library as the finished design system

For example, when the elements in a card need spacing, let a layout own it instead of giving each child a margin:

```html
<!-- Avoid: every child spaces itself -->
<article class="card">
  <h2 style="margin-bottom: 12px">Title</h2>
  <p>Text</p>
</article>

<!-- Prefer: the layout owns the spacing, set with a semantic token -->
<article class="card | flex --column" style="--layout-gap: var(--space-s)">
  <h2>Title</h2>
  <p>Text</p>
</article>
```
