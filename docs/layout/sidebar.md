---
layout: base.njk
title: Sidebar
parent: layout
key: sidebar
github: true
---

The **Sidebar** layout creates a responsive 2-column layout with one fixed-width column and one flexible column. This component automatically switches from horizontal to vertical layout based on content constraints, making it perfect for main content areas with sidebars that need to gracefully collapse on smaller screens or when space becomes limited.

{% include "svg/sidebar.svg" %}

## Example

```html
<div class="sidebar --right" style="--layout-gap: 1rem; --layout-threshold: 20rem">
  <main>Main content area that flexes</main>
  <aside>Fixed-width sidebar content</aside>
</div>
```

## Custom Properties

<div class="scroll">
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>--layout-gap</code></td>
      <td><code>0</code></td>
      <td>Gap between child elements</td>
    </tr>
    <tr>
      <td><code>--layout-threshold</code></td>
      <td><code>0</code></td>
      <td>Fixed width of the sidebar column</td>
    </tr>
    <tr>
      <td><code>--layout-inline-size</code></td>
      <td><code>60%</code></td>
      <td>Minimum size of the flexible column before wrapping</td>
    </tr>
    <tr>
      <td><code>--layout-items</code></td>
      <td><code>stretch</code></td>
      <td>Align items on cross axis</td>
    </tr>
    <tr>
      <td><code>--layout-justify</code></td>
      <td><code>start</code></td>
      <td>Justify content on main axis</td>
    </tr>
  </tbody>
</table>
</div>

## Class Utilities

<div class="scroll">
<table>
  <thead>
    <tr>
      <th>Class</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>.--start</code>, <code>.--end</code>, <code>.--center</code>, <code>.--stretch</code></td>
      <td>Controls cross-axis alignment of items</td>
    </tr>
    <tr>
      <td><code>.--justify-*</code></td>
      <td>Controls main-axis distribution of items (start, end, center, between, around)</td>
    </tr>
    <tr>
      <td><code>.--left</code></td>
      <td>Makes the first child the flexible column, second child the sidebar</td>
    </tr>
    <tr>
      <td><code>.--right</code></td>
      <td>Makes the second child the flexible column, first child the sidebar</td>
    </tr>
  </tbody>
</table>
</div>
