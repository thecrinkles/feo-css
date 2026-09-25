---
layout: base.njk
title: Migration
order: 8
key: migration
description: "Every breaking change from Feo.css 5.x to 6.x, with the replacement for each removed token, class, and block."
---

Feo.css 6 is a rewrite around a [layered, token-driven architecture](/principles/). Most breaking changes _remove_ things rather than rename them: the built-in token scale, every class that depended on it, and all blocks are gone. This guide lists every change and removal from 5.x to 6.x, ordered by how likely it is to affect you.

## Installing

Feo.css 6 is published under the `beta` tag, and the package now ships **only** the minified `feo.min.css` (5.x also shipped an unminified `feo.css`). Update the path wherever you reference it.

```
npm install feo-css@beta
```

```html
<link rel="stylesheet" href="https://unpkg.com/feo-css@beta/feo.min.css" />
```

## Cascade layers

Feo.css 5 used four layers. Feo.css 6 adds a `tokens` layer at the bottom and renames `blocks` to `components`.

```css
/* 5.x */
@layer global, layout, blocks, utilities;
/* 6.x */
@layer tokens, global, layout, components, utilities;
```

Restate the 6.x order at the top of your own stylesheet and put your rules into those layers. Anything you wrote in `@layer blocks` moves to `@layer components`. Unlayered CSS beats every layer, so it still overrides Feo.css — but it also bypasses the architecture.

## Tokens are gone

Feo.css 6 ships **no tokens**. Define your own in the `tokens` layer (see [Tokens](/tokens/)).

<div class="scroll">

| 5.x                                                    | 6.x                                                                                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| `--token-size-000` … `--token-size-5`, `--feo-scale`   | Removed. Define your own (fluid) size scale.                                         |
| `--token-bp-000` … `--token-bp-5`                      | Removed. Set `--layout-threshold` directly; use `@custom-media` for breakpoints.     |
| `--token-neutral-0` … `--token-neutral-5`              | Removed.                                                                             |
| `--text-0` … `--text-2`, `--surface-0` … `--surface-2` | Removed. Feo.css no longer sets any colors.                                          |
| `--sans-serif`, `--serif`, `--monospace`               | Removed. `body` uses `system-ui, sans-serif`; `code` uses `ui-monospace, monospace`. |

</div>

If your own CSS reads the 5.x tokens, paste them into your `tokens` layer to keep it working while you migrate, then rename them to your own semantic tokens over time:

```css
@layer tokens {
  :root {
    --token-neutral-0: hsl(215, 12%, 12%);
    --token-neutral-1: hsl(215, 12%, 22%);
    --token-neutral-2: hsl(215, 12%, 36%);
    --token-neutral-3: hsl(215, 24%, 78%);
    --token-neutral-4: hsl(215, 24%, 92%);
    --token-neutral-5: hsl(215, 24%, 98%);

    --token-bp-0: 20rem;
    --token-bp-000: calc(var(--token-bp-00) / 1.33);
    --token-bp-00: calc(var(--token-bp-0) / 1.33);
    --token-bp-1: calc(var(--token-bp-0) * 1.33);
    --token-bp-2: calc(var(--token-bp-1) * 1.33);
    --token-bp-3: calc(var(--token-bp-2) * 1.33);
    --token-bp-4: calc(var(--token-bp-3) * 1.33);
    --token-bp-5: calc(var(--token-bp-4) * 1.33);

    --feo-scale: calc(5 * (min(100vw, 1240px) - 320px) / 920);
    --token-size-000: calc(0.65rem + 0.65 * var(--feo-scale));
    --token-size-00: calc(0.8125rem + 0.8125 * var(--feo-scale));
    --token-size-0: calc(1rem + var(--feo-scale));
    --token-size-1: calc(1.33rem + 1.33 * var(--feo-scale));
    --token-size-2: calc(1.78rem + 1.78 * var(--feo-scale));
    --token-size-3: calc(2.37rem + 2.37 * var(--feo-scale));
    --token-size-4: calc(3.16rem + 3.16 * var(--feo-scale));
    --token-size-5: calc(4.21rem + 4.21 * var(--feo-scale));

    --text-0: var(--token-neutral-0);
    --text-1: var(--token-neutral-1);
    --text-2: var(--token-neutral-2);
    --surface-0: var(--token-neutral-5);
    --surface-1: var(--token-neutral-4);
    --surface-2: var(--token-neutral-3);
  }
}
```

## Global and reset

These changes affect plain HTML, without touching any class. Every [global](/global/) rule is now wrapped in `:where()` (zero specificity), so rules you add to the same `global` layer override them without specificity fights.

<div class="scroll">

| Element                 | 5.x                                                            | 6.x                                                                                                                 |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Colors                  | `color-scheme: light`; `body` color and background from tokens | `color-scheme: light dark`; no colors, so dark-mode users get browser defaults                                      |
| `ul`, `ol`              | Bullets removed only with `role="list"`                        | Bullets and padding removed from **all** lists                                                                      |
| `a`                     | Every link inherits its color                                  | Only unclassed links inherit their color, with a half-transparent underline: a link with a class turns browser blue |
| `img`, `picture`, `svg` | `max-width: 100%`                                              | `inline-size: 100%`: media fill the width of their container                                                        |
| Borders                 | `border: 0` on all elements                                    | Not reset: browser borders on inputs, buttons, and fieldsets return                                                 |
| `body` text             | Fluid `--token-size-0` (16–21px), `line-height: 1.4`           | `1rem`, `line-height: 1.5`                                                                                          |
| `h1` / `h2` / `h3`      | Fluid `2.37rem` / `1.78rem` / `1.33rem`, weight `600`          | `1.953rem` / `1.563rem` / `1.25rem` (1.25 scale), weight `700`                                                      |
| `code`, `pre`           | Background, border, and `0.85em` size                          | Monospace font and whitespace handling only                                                                         |
| `::selection`           | Inverted text and surface colors                               | Browser default                                                                                                     |
| `:target`               | `scroll-margin-block: 5ex`                                     | Browser default                                                                                                     |
| `text-size-adjust`      | `none`, which blocks text scaling on mobile                    | `100%`                                                                                                              |

</div>

To restore the 5.x look, add the rules you want back to your own `global` layer:

```css
@layer global {
  :root {
    color-scheme: light;
  }
  body {
    color: var(--text-0);
    background-color: var(--surface-0);
  }
  /* bullets in prose content */
  :where(article) :where(ul, ol):not([class]) {
    list-style: revert;
    padding-inline-start: revert;
  }
}
```

## Layouts

### `--layout-align` is now `--layout-items`

The property that sets `align-items` is renamed on every layout. The `.--start` and `.--end` class utilities now set `start` and `end` instead of `flex-start` and `flex-end`.

```html
<!-- 5.x -->
<div class="flex" style="--layout-align: start">…</div>
<!-- 6.x -->
<div class="flex" style="--layout-items: start">…</div>
```

### Default alignment changed

Three layouts no longer center their children on the cross axis. Add `.--center` where you relied on it.

<div class="scroll">

| Layout   | 5.x default | 6.x default |
| -------- | ----------- | ----------- |
| `.flex`  | `center`    | `stretch`   |
| `.repel` | `center`    | `stretch`   |
| `.equal` | `center`    | `stretch`   |

</div>

### Scale class utilities are removed

These classes read the 5.x tokens and are gone with them. Set the custom property directly, or define the few classes you use in your own `utilities` layer.

<div class="scroll">

| 5.x                                           | 6.x                                                      |
| --------------------------------------------- | -------------------------------------------------------- |
| `.--gap-none`, `.--gap-000` … `.--gap-5`      | `--layout-gap`                                           |
| `.--threshold-000` … `.--threshold-5`         | `--layout-threshold`                                     |
| `.--amount-1`, `.--amount-7` … `.--amount-12` | `--layout-amount` (`.--amount-2` … `.--amount-6` remain) |

</div>

```css
@layer utilities {
  /* recreate the steps you actually use, backed by your own tokens */
  .--gap-1 {
    --layout-gap: var(--token-size-1);
  }
}
```

### Per-layout changes

- **`.fifty`** is removed. Use [`.tiles`](/layout/tiles/) with `.--fit` and the same `--layout-threshold`: two children wrap at the same width. Use [`.switcher`](/layout/switcher/) if all children should stack at once.
- **`.pile`** no longer reads `--layout-ratio`. Add the [`.ratio`](/layout/aspect-ratio/) layout to the same element (`class="pile ratio --ratio-16x9"`). Its `place-items` now reads `--layout-items` (default `center`).
- **`.tiles`** defaults to `auto-fill` instead of `auto-fit`, so a few tiles no longer stretch across the full row. Add `.--fit` for the 5.x behavior.
- **`.grid`** and **`.pancake`** tracks use `minmax(0, 1fr)`: long content no longer stretches a column or row beyond its share.
- **`.grow`** is removed. Use `style="flex-grow: 1"` or your own utility.

## Blocks are removed

All 5.x blocks are gone. The form and table blocks styled **bare elements**, so forms and tables fall back to browser defaults without any markup change.

<div class="scroll">

| 5.x block | Selectors                                                     |
| --------- | ------------------------------------------------------------- |
| Accordion | `details.accordion`                                           |
| Forms     | `form`, `label`, `input`, `select`, `textarea`, `input[list]` |
| Table     | `table`, `th`, `td`, and a `div` wrapping a single table      |
| Toggle    | `input[type="checkbox"].toggle`                               |
| Tooltip   | `[data-tooltip]`, `[data-tooltip-bottom]`                     |

</div>

To keep one, copy its CSS from the [5.4.4 source](https://github.com/thecrinkles/feo-css/tree/v5.4.4/src/blocks) into your `components` layer and replace the `--token-*` references with your own tokens.

## Utilities

<div class="scroll">

| 5.x                                                                          | 6.x                                                                                           |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `.m-*`, `.mt-*`, `.mr-*`, `.mb-*`, `.ml-*`                                   | Removed. Let a layout own the spacing (`--layout-gap`, `.flow`).                              |
| `.size-000` … `.size-5`                                                      | Removed. Use your own tokens.                                                                 |
| `.maxw-000` … `.maxw-5`                                                      | Removed. Use [`.center`](/layout/center/) with `--layout-threshold`.                          |
| `.bold`, `.regular`                                                          | Removed.                                                                                      |
| `.scroll-container`                                                          | Removed. [`.scroll`](/layout/scroll/) scrolls horizontally, so it is no replacement.          |
| `.contrast`                                                                  | Removed.                                                                                      |
| `@keyframes` `wiggle`, `fade-in`, `slide-up-1`, `slide-up-2`, `slide-down-1` | Removed.                                                                                      |
| `.hover-group`                                                               | Moved to [components](/components/hover-group/). `--opacity` is renamed to `--hover-opacity`. |

</div>

## Checklist

1. Install `feo-css@beta` and point every reference at `feo.min.css`.
2. Restate the 6.x layer order and move `@layer blocks` to `@layer components`.
3. Define your tokens, or paste the 5.x tokens as a starting point.
4. Set `body` colors and `color-scheme`, and restore list bullets in prose.
5. Replace `.--gap-*`, `.--threshold-*`, `.m*-*`, `.size-*`, and `.maxw-*`.
6. Rename `--layout-align` to `--layout-items`, and add `.--center` to `.flex`, `.repel`, and `.equal` where needed.
7. Replace `.fifty`, `.grow`, `.scroll-container`, and `--layout-ratio` on `.pile`.
8. Port the blocks you used into your `components` layer.
