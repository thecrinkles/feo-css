---
layout: base.njk
title: Layout
order: 5
key: layout
description: "The Feo.css layouts, the shared --layout-* properties that configure them, and which layout to use when."
---

Feo.css offers classes for standardized layout patterns that you see on almost every website or application. Many layouts are based on [Every Layout](https://every-layout.dev) by Heydon Pickering and Andy Bell. But the implementation differs. In addition, more layout patterns are added to Feo.css as well.

{% include "partials/callout-utilities.njk" %}

## Configuring layouts

Every layout exposes its configuration through `--layout-*` custom properties (see each layout's _Custom Properties_ table). Feo.css does not ship a preset size scale, so values like `--layout-gap` and `--layout-threshold` are set directly to whatever value you need — a raw length or, preferably, one of your own project's tokens:

```html
<div class="switcher" style="--layout-gap: 1rem; --layout-threshold: 20rem">
  <!-- ... -->
</div>
```

A layout only positions its direct children, so wrap content that should move as one unit in a single element. The properties are shared between layouts: once you know them for one layout, you know them for all.

<div class="scroll">

| Property               | Controls                                                | Used by                                                          |
| ---------------------- | ------------------------------------------------------- | ---------------------------------------------------------------- |
| `--layout-gap`         | Space between the children                              | All layouts, except center, pile, ratio, and scroll              |
| `--layout-threshold`   | A switch point, a column width, or a maximum width      | Center, sidebar, switcher, and tiles                             |
| `--layout-direction`   | `flex-direction`                                        | Equal, flex, repel, and switcher                                 |
| `--layout-items`       | Alignment on the cross axis                             | Cluster, equal, flex, pile, repel, scroll, sidebar, and switcher |
| `--layout-justify`     | Alignment on the main axis                              | Cluster, equal, flex, sidebar, and switcher                      |
| `--layout-amount`      | The number of columns                                   | Grid                                                             |
| `--layout-inline-size` | The minimum size of the flexible column before it wraps | Sidebar                                                          |
| `--ratio`              | The aspect ratio                                        | Ratio                                                            |

</div>

Alignment, direction, column count, and aspect ratio are also available as class utilities. Modifiers that only apply to one layout, like `.--left` on the sidebar, are documented on that layout's page.

<div class="scroll">

| Class utilities                                                                                      | Sets                 |
| ---------------------------------------------------------------------------------------------------- | -------------------- |
| `.--row`, `.--column`                                                                                | `--layout-direction` |
| `.--start`, `.--center`, `.--end`, `.--stretch`                                                      | `--layout-items`     |
| `.--justify-start`, `.--justify-center`, `.--justify-end`, `.--justify-between`, `.--justify-around` | `--layout-justify`   |
| `.--amount-2` … `.--amount-6`                                                                        | `--layout-amount`    |
| `.--ratio-1x1`, `.--ratio-16x9`, `.--ratio-2x1`, `.--ratio-3x2`                                      | `--ratio`            |

</div>

## Choosing a layout

<div class="scroll">

| You need                                              | Use                                   |
| ----------------------------------------------------- | ------------------------------------- |
| Content centered with a maximum width                 | [Center](/layout/center/)             |
| Vertical rhythm between flowing content, like prose   | [Flow](/layout/flow/)                 |
| A row or column of items with a gap                   | [Flex](/layout/flex/)                 |
| Items that wrap onto new lines, like tags             | [Cluster](/layout/cluster/)           |
| Items pushed to opposite ends, like a header bar      | [Repel](/layout/repel/)               |
| Children of equal size in one row                     | [Equal](/layout/equal/)               |
| A fixed-width side column next to a flexible column   | [Sidebar](/layout/sidebar/)           |
| A row that stacks all at once below a width           | [Switcher](/layout/switcher/)         |
| A responsive grid of cards with a minimum width       | [Tiles](/layout/tiles/)               |
| A fixed number of columns                             | [Grid](/layout/grid/)                 |
| A header, footer, and a main area that fills the rest | [Pancake](/layout/pancake/)           |
| Children stacked on top of each other                 | [Pile](/layout/pile/)                 |
| A fixed aspect ratio                                  | [Aspect Ratio](/layout/aspect-ratio/) |
| Horizontal scrolling                                  | [Scroll](/layout/scroll/)             |

</div>
